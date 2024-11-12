/* eslint-disable react/prop-types */
import './ChatItem.css';
import { formatTime } from '../../../../utils/dateAndTime';

const renderChatState = (state) => {
  switch (state) {
    case 'CONFIRMATION':
      return { stateText: '답변대기', stateClass: 'confirmation' };
    case 'COMPLETE':
      return { stateText: '', stateClass: 'complete' };
    case 'WAITING':
      return { stateText: '읽지않음', stateClass: 'waiting' };
  }
};

const ChatItem = ({ chat, onClick }) => {
  const { stateText, stateClass } = renderChatState(chat.chatState);
  
  return (
    <li className={`chat-item ${chat.chatState.toLowerCase()}`} onClick={() => onClick(chat.studentId)}>
      <div className="chat-time">{formatTime(chat.localDateTime)}</div>
      <div className="chat-student-id">{chat.studentId}</div>
      <div className="chat-comment">{chat.comment}</div>
      <div className={`chat-state ${stateClass}`}>
        <span></span>
        {stateText}
      </div>
    </li>
  );
};

export default ChatItem;