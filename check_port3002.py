import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

# Check port 3002 có listen không
_, out, _ = c.exec_command('ss -tlnp | grep 3002')
print("3002:", out.read().decode())

# Check firewall/iptables
_, out, _ = c.exec_command('iptables -L INPUT -n | grep -E "3002|ACCEPT|DROP" | head -10')
print("iptables:", out.read().decode())

# Check ufw
_, out, _ = c.exec_command('ufw status 2>/dev/null | head -20')
print("ufw:", out.read().decode())

c.close()
