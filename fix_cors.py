import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

# Patch CORS — dùng wildcard cho demo
_, out, err = c.exec_command(r"""sed -i "s/origin: \['https:\/\/giabao72.github.io'.*\]/origin: '*'/" /root/tuan-food-api/src/index.js""")
out.channel.recv_exit_status()

# Verify
_, out, _ = c.exec_command('grep -A3 "cors(" /root/tuan-food-api/src/index.js')
sys.stdout.buffer.write(out.read())

# Restart API
_, out, _ = c.exec_command('pm2 restart tuan-food-api')
out.channel.recv_exit_status()
print("\nRestarted")

# Test lại CORS
_, out, _ = c.exec_command('curl -s -I -H "Origin: http://103.166.183.57:3002" http://localhost:3001/orders')
sys.stdout.buffer.write(out.read())

c.close()
