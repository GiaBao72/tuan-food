import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

_, out, err = c.exec_command('ufw allow 3002/tcp && ufw allow 3001/tcp && ufw reload')
sys.stdout.buffer.write(out.read())
sys.stdout.buffer.write(err.read())

_, out, _ = c.exec_command('ufw status | grep -E "3001|3002"')
print("\nResult:", out.read().decode())

c.close()
