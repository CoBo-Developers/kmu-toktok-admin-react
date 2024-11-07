import './App.css'
import { Route, Routes } from 'react-router-dom'
import Aside from './components/aside/Aside'
import useShowAside from './hooks/useShowAside'
import Manage from './routes/Manage';
import Login from './routes/Login';
import Redirect from './routes/Redirect';
import Register from './routes/Register';
import useReissue from './hooks/useReissue';
import Chatbot from './routes/Chatbot';
import History from './routes/History';
import ChatStu from './routes/ChatStu';
import WritingList from './routes/WritingList';
import WritingSubmit from './routes/WritingSubmit';
import File from './routes/File/File';

function App() {
  const showAside = useShowAside();
  useReissue();

  return (
    <div className="page">
      {
        showAside ? <Aside /> : null
      }      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path="/chatstu" element={<ChatStu />}>
          <Route path=":studentId" element={<ChatStu />} />
        </Route>
        <Route path='/file' element={<File/>} />
        <Route path='/writing' element={<WritingList />} />
        <Route path='/writing/:writingId' element={<WritingList />} />
        <Route path='/writing/:writingId/:studentId' element={<WritingSubmit />} />
        <Route path='/manage' element={<Manage />} />
        <Route path='/manage/:id' element={<History />} />
        <Route path="/redirect/:option" element={<Redirect />} />
      </Routes>
    </div>
  )
}

export default App