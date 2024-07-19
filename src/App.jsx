import { Route, Routes } from 'react-router-dom'
import './App.css'
import Aside from './components/aside/Aside'
import useShowAside from './hooks/useShowAside'

function App() {
  const showAside = useShowAside();

  return (
    <div className='page'>
      { showAside ? <Aside /> : null }
      <Routes>
        <Route path='/chatbot' element={""} />
        <Route path='/chatstu' element={""} />
        <Route path='/file' element={""} />
        <Route path='/writing' element={""} />
        <Route path='/manage' element={""} />
      </Routes>
    </div>
  )
}

export default App
