import { useNavigate, useParams } from 'react-router-dom';
import './History.css';
import ltIcon from '../assets/icons/lt_icon.png';
import useChatHistory from '../hooks/useChatHistory';

function History() {
  const navigate = useNavigate();
  const {
    id,
    chatHistory,
    chatListRef
  } = useChatHistory();

  return (
    <main className="history">
      <header className="history-header">
        <div className="history-header-inner">
          <span className="history-return-btn" onClick={() => {
            navigate(-1);
          }}>
            <img src={ltIcon} alt="lt-icon" /> 돌아가기
          </span>
          { id }
        </div>
      </header>
      <div className="history-inner">
        <section className="message-container">
          <article className="message-container-inner">
            {
              chatHistory.map((item, i) => {
                item.answer = item.answer
                  .replace(/""/g, '"')
                  .replace(/\\"/g, '"')
                  .replace(/\\n/g, '\n')
                  .replace(/【\d+:\d+†source】/g, '');
                return (
                  <div key={i}>
                    <div className='message-wrapper'>
                      <div className="message user">
                        { item.question }
                      </div>
                    </div>
                    <div className='message-wrapper'>
                      <div className="message bot">
                        { item.answer || "Loading..." }
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div ref={chatListRef}></div>
          </article>
        </section>
      </div>
    </main>
  )
}

export default History