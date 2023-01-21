import { Route } from 'react-router-dom'

export default (
  <Route path="/*">
    <Route path="pricing" element={<h1>Pricing</h1>} />
    <Route path="about" element={<h1>About</h1>} />
    <Route path="contact" element={<h1>Contact</h1>} />
    <Route path="help" element={<h1>Help</h1>} />

    <Route index element={<>error</>} />
    <Route path="*" element={<>error</>} />
  </Route>
)
