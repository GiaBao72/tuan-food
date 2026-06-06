import paramiko, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('103.166.183.57', port=24700, username='root', password='*U>yC8swHFoI<LvAiOR3', timeout=10)

index_js = r"""import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import Database from 'better-sqlite3'
import { mkdirSync } from 'fs'

mkdirSync('/root/tuan-food-api/data', { recursive: true })
const db = new Database('/root/tuan-food-api/data/orders.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    profile TEXT NOT NULL,
    tdee INTEGER, tKcal INTEGER,
    pkg TEXT, pkgDays INTEGER, pkgWeeks INTEGER, pkgDisc REAL,
    orderMode TEXT,
    singleSel TEXT, weekPlan TEXT,
    pkgTotal INTEGER, pkgSave INTEGER,
    note TEXT,
    status TEXT DEFAULT 'new',
    doneItems TEXT DEFAULT '[]',
    createdAt TEXT DEFAULT (datetime('now','localtime'))
  )
`)

const app = new Hono()

app.use('*', cors({ origin: '*', allowMethods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'], allowHeaders: ['Content-Type'] }))
app.use('*', logger())

app.get('/', (c) => c.json({ ok: true, service: 'tuan-food-api', time: new Date().toISOString() }))

const parse = (r) => ({
  ...r,
  profile: JSON.parse(r.profile),
  singleSel: JSON.parse(r.singleSel),
  weekPlan: JSON.parse(r.weekPlan),
  doneItems: JSON.parse(r.doneItems || '[]'),
})

// GET /orders
app.get('/orders', (c) => {
  const status = c.req.query('status')
  const rows = (status && status !== 'all')
    ? db.prepare('SELECT * FROM orders WHERE status=? ORDER BY id DESC').all(status)
    : db.prepare('SELECT * FROM orders ORDER BY id DESC').all()
  return c.json(rows.map(parse))
})

// POST /orders
app.post('/orders', async (c) => {
  const b = await c.req.json()
  db.prepare(`INSERT INTO orders (id,date,profile,tdee,tKcal,pkg,pkgDays,pkgWeeks,pkgDisc,orderMode,singleSel,weekPlan,pkgTotal,pkgSave,note,status,doneItems)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
    b.id, b.date, JSON.stringify(b.profile),
    b.tdee, b.tKcal, b.pkg, b.pkgDays, b.pkgWeeks, b.pkgDisc,
    b.orderMode, JSON.stringify(b.singleSel), JSON.stringify(b.weekPlan),
    b.pkgTotal, b.pkgSave, b.note||'', b.status||'new', JSON.stringify(b.doneItems||[])
  )
  return c.json({ ok: true, id: b.id }, 201)
})

// PATCH /orders/:id/status
app.patch('/orders/:id/status', async (c) => {
  const id = Number(c.req.param('id'))
  const { status } = await c.req.json()
  db.prepare('UPDATE orders SET status=? WHERE id=?').run(status, id)
  return c.json({ ok: true })
})

// PATCH /orders/:id/done-items
app.patch('/orders/:id/done-items', async (c) => {
  const id = Number(c.req.param('id'))
  const { itemId } = await c.req.json()
  const row = db.prepare('SELECT doneItems FROM orders WHERE id=?').get(id)
  if (!row) return c.json({ ok: false }, 404)
  const done = JSON.parse(row.doneItems || '[]')
  const updated = done.includes(itemId) ? done.filter(x => x !== itemId) : [...done, itemId]
  db.prepare('UPDATE orders SET doneItems=? WHERE id=?').run(JSON.stringify(updated), id)
  return c.json({ ok: true, doneItems: updated })
})

// GET /customers - lich su theo tung SĐT
app.get('/customers', (c) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY id DESC').all().map(parse)
  const map = {}
  for (const o of rows) {
    const phone = o.profile?.phone || 'unknown'
    if (!map[phone]) map[phone] = {
      phone,
      goal: o.profile?.goal,
      gender: o.profile?.gender,
      orders: [],
      totalSpent: 0,
      totalOrders: 0,
    }
    map[phone].orders.push({
      id: o.id, date: o.date, pkg: o.pkg, pkgDays: o.pkgDays,
      pkgTotal: o.pkgTotal, status: o.status, orderMode: o.orderMode,
      note: o.note,
    })
    map[phone].totalSpent += o.pkgTotal || 0
    map[phone].totalOrders += 1
  }
  const customers = Object.values(map).sort((a, b) => b.totalOrders - a.totalOrders)
  return c.json(customers)
})

serve({ fetch: app.fetch, port: 3001, hostname: '0.0.0.0' }, () => {
  console.log('tuan-food-api running on port 3001')
})
"""

# Ghi file qua stdin để tránh escaping issue
stdin, stdout, stderr = c.exec_command('cat > /root/tuan-food-api/src/index.js')
stdin.write(index_js)
stdin.channel.shutdown_write()
stdout.channel.recv_exit_status()
print("File written")

_, out, _ = c.exec_command('pm2 restart tuan-food-api && sleep 2 && curl -s http://localhost:3001/')
sys.stdout.buffer.write(out.read())

c.close()
