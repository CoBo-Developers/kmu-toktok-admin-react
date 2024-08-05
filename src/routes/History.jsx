import { useNavigate, useParams } from 'react-router-dom';
import './History.css';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getStudentChat } from '../api/chatApi';
import ltIcon from '../assets/icons/lt_icon.png';

function History() {
  const params = useParams();
  const [cookies] = useCookies(['accessToken']);
  const [chatHistory, setChatHistory] = useState([]);
  const chatListRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.accessToken) {
      getStudentChat(params.id, cookies.accessToken)
      .then((res) => {
        setChatHistory(res.data);
        console.log(res);
      })
      .catch((err) => {
        alert(err.message);
      })
    }
  }, [])

  useEffect(() => {
    chatListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <main className="history">
      <header className="history-header">
        <div className="history-header-inner">
          <span className="history-return-btn" onClick={() => {
            navigate(-1);
          }}>
            <img src={ltIcon} alt="lt-icon" /> 돌아가기
          </span>
          { params.id }
        </div>
      </header>
      <div className="history-inner">
        <section className="message-container">
          <article className="message-container-inner">
            {
              chatHistory.map((item, i) => {
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