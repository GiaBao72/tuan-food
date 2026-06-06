import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

# Test CORS từ origin của frontend
_, out, _ = c.exec_command('curl -s -I -H "Origin: http://103.166.183.57:3002" http://localhost:3001/orders')
sys.stdout.buffer.write(out.read())

c.close()
