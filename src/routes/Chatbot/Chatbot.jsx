import sendIcon from '../../assets/icons/send-icon.svg';
import useChatbot from './hooks/useChatbot';
import './Chatbot.css';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import Loading from './components/Loading/Loading';

function Chatbot() {
  const {
    textarea,
    submitBtn,
    chatListRef,
    chatList,
    handleTextareaChange,
    handleTextareaKeyDown,
    handleTextareaKeyUp,
    handleMessageSubmit,
    isLoading
  } = useChatbot();

  let isBotLoading = false;

  return (
    <main className="chatbot">
      <LoadingModal show={isLoading} />
      <section className="message-container">
        <article className="message-container-inner">
          <div className='message-wrapper'>
            <div className="message bot">
              안녕하세요! 궁금한 것이 있으신가요?<br />
              아래 입력창에 질문해주세요.
            </div>
          </div>
          {
            chatList.map((item, i) => {
              let formattedAnswer;
              let lastCharIdx;

              if (item.answer) lastCharIdx = item.answer.length - 1;

              if (item.answer && item.answer[0] === '\"' && item.answer[lastCharIdx] === '\"') {
                formattedAnswer = item.answer
                .slice(1, lastCharIdx)
                .replace(/""/g, '"')
                .replace(/\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/【\d+:\d+†source】/g, '');
              } else if (item.answer) {
                formattedAnswer = item.answer
                .replace(/""/g, '"')
                .replace(/\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/【\d+:\d+†source】/g, '');
              }
              
              if (!formattedAnswer) {
                isBotLoading = true;
              }
              return (
                <div key={i}>
                  <div className='message-wrapper'>
                    <div className="message user">
                      { item.question }
                    </div>
                  </div>
                  <div className='message-wrapper'>
                    <div className="message bot">
                      { formattedAnswer || <Loading /> }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </article>
        <div ref={chatListRef}></div>
      </section>
      <section className="message-input-wrapper">
        <textarea name="send-message" id="send-message" rows={1} 
          placeholder="질문을 입력해주세요" ref={textarea} 
          onChange={handleTextareaChange}
          onKeyUp={handleTextareaKeyUp}
          onKeyDown={handleTextareaKeyDown}
          disabled={isBotLoading}
          >
        </textarea>
        <button className='send-btn' onClick={handleMessageSubmit} ref={submitBtn}>
          <img src={sendIcon} alt="send-icon" />
        </button>
      </section>
    </main>
  )
}

export default Chatbot