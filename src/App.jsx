
import { Routes, Route } from 'react-router-dom'
import './App.css'
import User from './pages/User'
import NotFound from './pages/NotFound'
import Layout from './routes/Layout'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Admin from './pages/Admin'

function App() {


  return (
    <div className='principal flex flex-col min-h-screen antialised bg-neutral-100 font-productsans'>
      <Routes>
        <Route path='/*' element={<Layout />} />
        <Route path='/user/*' element={<User />} />
        <Route path='/admin/*' element={<ProtectedRoutes>
          <Admin />
        </ProtectedRoutes>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}


export default App
