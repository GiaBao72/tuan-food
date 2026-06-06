import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

# Thêm endpoint GET /customers vào index.js
new_endpoint = """
// GET /customers - danh sach khach hang + lich su don
app.get('/customers', (c) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY id DESC').all()
  const parsed = rows.map(r => ({
    ...r,
    profile: JSON.parse(r.profile),
    singleSel: JSON.parse(r.singleSel),
    weekPlan: JSON.parse(r.weekPlan),
    doneItems: JSON.parse(r.doneItems || '[]'),
  }))
  // Group by phone
  const map = {}
  for (const o of parsed) {
    const phone = o.profile?.phone || 'unknown'
    if (!map[phone]) map[phone] = { phone, orders: [], totalSpent: 0, lastOrder: o.date }
    map[phone].orders.push(o)
    map[phone].totalSpent += o.pkgTotal || 0
  }
  const customers = Object.values(map).sort((a, b) => b.orders.length - a.orders.length)
  return c.json(customers)
})

serve"""

_, out, err = c.exec_command(r"sed -i 's/^serve//' /root/tuan-food-api/src/index.js")
out.channel.recv_exit_status()

# Append trước serve(
_, out, err = c.exec_command("""cat >> /root/tuan-food-api/src/index.js << 'ADDEOF'

// GET /customers - danh sach khach hang + lich su don
app.get('/customers', (c) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY id DESC').all()
  const parsed = rows.map(r => ({
    ...r,
    profile: JSON.parse(r.profile),
    singleSel: JSON.parse(r.singleSel),
    weekPlan: JSON.parse(r.weekPlan),
    doneItems: JSON.parse(r.doneItems || '[]'),
  }))
  const map = {}
  for (const o of parsed) {
    const phone = o.profile?.phone || 'unknown'
    if (!map[phone]) map[phone] = { phone, orders: [], totalSpent: 0, lastOrder: o.date }
    map[phone].orders.push(o)
    map[phone].totalSpent += o.pkgTotal || 0
  }
  const customers = Object.values(map).sort((a, b) => b.orders.length - a.orders.length)
  return c.json(customers)
})
ADDEOF""")
out.channel.recv_exit_status()
print("Endpoint added")

# Check file cuoi
_, out, _ = c.exec_command('tail -20 /root/tuan-food-api/src/index.js')
sys.stdout.buffer.write(out.read())

c.close()
