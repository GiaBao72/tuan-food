import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=30)
_, out, _ = c.exec_command('cd /root/tuan-food && git pull && VITE_BASE_PATH=/ VITE_API_URL=http://103.166.183.57:3001 npm run build 2>&1 | tail -5')
sys.stdout.buffer.write(out.read())
c.close()
