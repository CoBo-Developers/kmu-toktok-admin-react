import './ChatStu.css';
import sendIcon from '../assets/icons/send-icon.png';
import backIcon from '../assets/icons/back-icon.png';
import useChatStu from '../hooks/useChatStu';
import { formatDate, formatTime } from '../utils/dateAndTime';

function ChatStu() {
  const {
    chatContent,
    newMessage,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleKeyUp,
    handleBack,
    selectedChatStu,
    inputRef,
    chatContentRef,
    sendRef,
  } = useChatStu();

  if (!selectedChatStu.studentId) return null;

  return (
    <main className="chat-container">
      <section className='chat-header'>
        <img src={backIcon} alt="" onClick={handleBack} />
        <span className='chat-header-text'>{selectedChatStu.studentId}</span>
      </section>
      <section className='chat-wrapper' ref={chatContentRef}>
        {chatContent.map((chat, index) => (
          <section key={index}>
            {(index === 0 || formatDate(chat.localDateTime) !== formatDate(chatContent[index - 1].localDateTime)) && (
              <div className="date-wrapper">{formatDate(chat.localDateTime)}</div>
            )}
            <article className={`message ${chat.question ? 'answer' : 'question'}`}>
              <div className={`message-content ${chat.question ? 'answer' : 'question'}`}>
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
          <textarea
            rows={1}
            className="input-text"
            placeholder="메시지를 입력해주세요"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown = {handleKeyDown}
            onKeyUp = {handleKeyUp}
            ref = {inputRef}
          />
          <button type='submit' className='send-btn' onClick={handleSend} ref={sendRef}>
            <img src={sendIcon} alt="Send" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default ChatStu;