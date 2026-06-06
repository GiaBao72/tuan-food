import paramiko, sys, time

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=30)

def run(cmd, timeout=120):
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace')
    e = err.read().decode('utf-8', errors='replace')
    if o: sys.stdout.buffer.write(('OUT: ' + o).encode('utf-8', errors='replace'))
    if e: sys.stdout.buffer.write(('ERR: ' + e[:300]).encode('utf-8', errors='replace'))
    return o

# Clone hoặc pull repo
print("\n=== Clone/Pull repo ===")
run('[ -d /root/tuan-food ] && cd /root/tuan-food && git pull || git clone https://github.com/GiaBao72/tuan-food.git /root/tuan-food')

# Install deps
print("\n=== npm install ===")
run('cd /root/tuan-food && npm install 2>&1 | tail -5', timeout=120)

# Build với base /
print("\n=== npm build ===")
run('cd /root/tuan-food && VITE_BASE_PATH=/ VITE_API_URL=http://103.166.183.57:3001 npm run build 2>&1 | tail -20', timeout=120)

# Xem dist có file không
print("\n=== Check dist ===")
run('ls /root/tuan-food/dist/')

# Tạo nginx config serve static
nginx_conf = '''server {
    listen 3002;
    server_name _;
    root /root/tuan-food/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls
    location /api/ {
        proxy_pass http://127.0.0.1:3001/;
        proxy_set_header Host $host;
    }
}
'''

# Ghi file nginx config
cmd = "cat > /etc/nginx/sites-available/tuan-food-frontend << 'EOF'\n" + nginx_conf + "EOF"
run(cmd)
run('ln -sf /etc/nginx/sites-available/tuan-food-frontend /etc/nginx/sites-enabled/tuan-food-frontend')
run('nginx -t 2>&1')
run('systemctl reload nginx')
print("\n=== DONE ===")
print("Frontend: http://103.166.183.57:3002")
print("Kitchen:  http://103.166.183.57:3002/#/kitchen")
print("API:      http://103.166.183.57:3001")

c.close()
