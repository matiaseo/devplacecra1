import { Route, Routes } from 'react-router-dom'

import './App.css'
import { Characters } from './Characters'

export function App() {
  return (
    <Routes>
      <Route path="/characters/*" element={<Characters />} />
      <Route path="/login" element={<div>login</div>} />
    </Routes>
  )
}

// export default App;
