import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=30)

def run(cmd, timeout=120):
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace')
    e = err.read().decode('utf-8', errors='replace')
    if o: print('OUT:', o[-300:])
    if e: print('ERR:', e[-200:])
    return o

run('cd /root/tuan-food && git pull')
run('cd /root/tuan-food && VITE_BASE_PATH=/ VITE_API_URL=http://103.166.183.57:3001 npm run build 2>&1 | tail -10', timeout=120)
print("Deploy done — http://103.166.183.57:3002")
c.close()
