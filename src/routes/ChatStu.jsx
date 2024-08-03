import { useEffect, useState } from 'react';
import './ChatStu.css';
import sendIcon from '../assets/icons/send-icon.png';
import backIcon from '../assets/icons/back-icon.png';
import { getChat, postChat } from '../api/chatStuApi';
import { useCookies } from 'react-cookie';
import { formatDate, formatTime } from '../utils/dateAndTime';
import useSeletectChatStu from '../store/useSelectedChatStu';

function ChatStu() {
  const [cookies] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const [chatContent, setChatContent] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { selectedChatStu, setSelectedChatStu} = useSeletectChatStu((state) => ({
    selectedChatStu: state.selectedChatStu,
    setSelectedChatStu: state.setSelectedChatStu,
  }));

  useEffect(() => {
    if (selectedChatStu.studentId) {
      getChat(cookies.accessToken, selectedChatStu.studentId)
        .then((chat) => {
          setChatContent(chat.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedChatStu.studentId]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '')
      return;

    const newChat = {
      comment: newMessage,
      localDateTime: new Date().toISOString(),
      question: false,
    };

    postChat(cookies.accessToken, selectedChatStu.studentId, newMessage)
      .then(() => {
        setChatContent([...chatContent, newChat]);
        setNewMessage('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  };
  const handleBack = () => {
    setSelectedChatStu(null);
  }

  return (
    <>
      {selectedChatStu.studentId && (
        <main className="chat-container">
          <section className='chat-header'>
            <img src={backIcon} alt="" onClick={handleBack}/>
            <span className='chat-header-text'>{selectedChatStu.studentId}</span>
          </section>
          <section className='chat-wrapper'>
            {chatContent.map((chat, index) => (
              <section key={index}>
                {(index === 0 || formatDate(chat.localDateTime) !== formatDate(chatContent[index - 1].localDateTime)) && (
                  <div className="date-wrapper">{formatDate(chat.localDateTime)}</div>
                )}
                <article className={`message ${chat.question ? 'question' : 'answer'}`}>
                  <div className={`message-content ${chat.question ? 'question' : 'answer'}`}>
                    {chat.comment}
                  </div>
                  {(index === chatContent.length - 1 || formatDate(chat.localDateTime) !== formatDate(chatContent[index + 1].localDateTime) || chat.question !== chatContent[index + 1].question) && (
                    <span className="message-time">{formatTime(chat.localDateTime)}</span>
                  )}
                </article>
              </section>
            ))}
          </section>

          <section className="input-wrapper">
            <div className='input-wrapper-inner'>
              <input
                type="text"
                className="input-text"
                placeholder="메시지를 입력해주세요"
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button type='submit' className='send-btn' onClick={handleSend}>
                <img src={sendIcon} alt="Send" />
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default ChatStu;