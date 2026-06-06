import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

# Tạo nginx config cho food-api.giaptech.site
nginx_conf = """server {
    server_name food-api.giaptech.site;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;

        # CORS handled by Hono
    }

    listen 80;
}
"""

stdin, stdout, stderr = c.exec_command('cat > /etc/nginx/sites-available/tuan-food-api << \'NGINX_EOF\'\n' + nginx_conf + '\nNGINX_EOF')
stdout.channel.recv_exit_status()

# Enable site
stdin, stdout, stderr = c.exec_command('ln -sf /etc/nginx/sites-available/tuan-food-api /etc/nginx/sites-enabled/tuan-food-api')
stdout.channel.recv_exit_status()

# Test nginx
_, out, err = c.exec_command('nginx -t 2>&1')
result = out.read().decode() + err.read().decode()
sys.stdout.buffer.write(result.encode('utf-8', errors='replace'))
print()

# Reload nginx
_, out, _ = c.exec_command('systemctl reload nginx')
out.channel.recv_exit_status()
print("Nginx reloaded")

# Get SSL cert
_, out, err = c.exec_command('certbot --nginx -d food-api.giaptech.site --non-interactive --agree-tos --email admin@giaptech.site 2>&1')
certout = out.read().decode('utf-8', errors='replace')
sys.stdout.buffer.write(certout.encode('utf-8', errors='replace'))

c.close()
