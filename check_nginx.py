import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

# Xem nginx config hiện tại
_, out, _ = c.exec_command('ls /etc/nginx/sites-enabled/')
print("sites-enabled:", out.read().decode())

_, out, _ = c.exec_command('ls /etc/nginx/conf.d/')
print("conf.d:", out.read().decode())

_, out, _ = c.exec_command('cat /etc/nginx/sites-enabled/default 2>/dev/null || cat /etc/nginx/conf.d/*.conf 2>/dev/null | head -60')
print("config:", out.read().decode())

c.close()
