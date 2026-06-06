import paramiko, sys
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

_, out, _ = c.exec_command('cat /etc/nginx/sites-enabled/langlearn')
sys.stdout.buffer.write(out.read())
c.close()
