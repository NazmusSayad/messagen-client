import { Route, Routes } from 'react-router-dom'

const All = ({ element }) => {
  return (
    <Routes>
      <Route path="/pricing" element={<h1>Pricing</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
      <Route path="/help" element={<h1>Help</h1>} />

      <Route path="*" element={element} />
    </Routes>
  )
}

export default All
