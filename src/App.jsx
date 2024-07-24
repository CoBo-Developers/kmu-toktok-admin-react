import './App.css'
import { Route, Routes } from 'react-router-dom'
import Aside from './components/aside/Aside'
import useShowAside from './hooks/useShowAside'
import Manage from './routes/Manage';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
  const showAside = useShowAside();

  return (
    <div className="page">
      {
        showAside ? <Aside /> : null
      }      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/chatbot' element={""} />
        <Route path='/chatstu' element={""} />
        <Route path='/file' element={""} />
        <Route path='/writing' element={""} />
        <Route path='/manage' element={<Manage />} />
      </Routes>
    </div>
  )
}

export default App
