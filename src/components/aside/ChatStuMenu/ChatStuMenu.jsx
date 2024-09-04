import './ChatStuMenu.css';
import searchIcon from '../../../assets/icons/search-icon-white.png';
import useChatListStore from '../../../store/useChatListStore';
import ChatItem from './ChatItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatList } from '../../../api/chatStuApi';
import { useCookies } from 'react-cookie';

function ChatStuMenu() {
  const [cookies] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const { chatList, setChatList } = useChatListStore((state) => ({
    chatList: state.chatList,
    setChatList: state.setChatList,
  }));
  const navigate = useNavigate();

  const handleChatClick = (studentId) => {
    navigate(`/chatstu/${studentId}`);
  };

  useEffect(() => {
    getChatList(cookies.accessToken, 0, 20)
      .then((res) => {
        setChatList(res.data.chatList);
    });
  },[]);

  return (
    <main className="chat-stu-menu">
      <section className="stu-search-wrapper">
        <div className='stu-search'>
          <input type="text" className='stu-search-input' placeholder='검색...' />
          <button className='stu-search-btn'>
            <img src={searchIcon} alt="" />
          </button>
        </div>
      </section>
      <ul className="chat-list">
        {chatList.map((chat, index) => (
          <ChatItem key={index} chat={chat} onClick={handleChatClick} />
        ))}
      </ul>
    </main>
  );
}
export default ChatStuMenu;