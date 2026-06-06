import { HashRouter, Routes, Route } from 'react-router-dom'
import CustomerApp from './pages/customer/CustomerApp'
import KitchenApp from './pages/kitchen/KitchenApp'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CustomerApp />} />
        <Route path="/kitchen" element={<KitchenApp />} />
      </Routes>
    </HashRouter>
  )
}
