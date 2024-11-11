/* eslint-disable react/prop-types */
import './ChatStuMenu.css';
import searchIcon from '../../../assets/icons/search-icon-white.svg';
import useChatListStore from '../../../store/useChatListStore';
import ChatItem from './components/ChatItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatList } from '../../../api/chatStuApi';
import { useCookies } from 'react-cookie';
import LoadingModal from '../../LoadingModal/LoadingModal';

function ChatStuMenu({ isMobile, setIsHeaderExtend }) {
  const [cookies] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const { chatList, setChatList, renderChatList } = useChatListStore((state) => ({
    chatList: state.chatList,
    setChatList: state.setChatList,
    renderChatList: state.renderChatList,
  }));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [filteredChatList, setFilteredChatList] = useState([]);

  const handleChatClick = (studentId) => {
    navigate(`/chatstu/${studentId}`);
    if (isMobile) {
      setIsHeaderExtend(false);
    }
  };
  const handleSearchBtn = () => {
    const filteredList = chatList.filter(chat => 
      chat.studentId.includes(searchStr)
    );
    setFilteredChatList(filteredList);
  };

  useEffect(() => {
    setIsLoading(true);
    getChatList(cookies.accessToken, 0, import.meta.env.VITE_CHATLIST_SIZE)
      .then((res) => {
        setChatList(res.data.chatList);
        setFilteredChatList(res.data.chatList);
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  },[renderChatList]);

  return (
    <main className="chat-stu-menu">
      <LoadingModal show={isLoading} />
      <section className="stu-search-wrapper">
        <div className='stu-search'>
          <input type="text" 
            className='stu-search-input' 
            placeholder='검색...'
            value={searchStr}
            onChange={(e)=>setSearchStr(e.target.value)}
            onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                handleSearchBtn();
              }
            }}
          />
          <button className='stu-search-btn' onClick={handleSearchBtn}>
            <img src={searchIcon} alt="" />
          </button>
        </div>
      </section>
      <ul className="chat-list">
        {filteredChatList.map((chat, index) => (
          <ChatItem key={index} chat={chat} onClick={handleChatClick} />
        ))}
      </ul>
    </main>
  );
}
export default ChatStuMenu;