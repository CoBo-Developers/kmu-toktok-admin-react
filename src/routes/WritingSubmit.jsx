import './WritingSubmit.css';
import backIcon from '../assets/icons/back-icon.png';
import { useNavigate } from "react-router-dom";
import useSubmittedWriting from '../hooks/useSubmittedWriting';
import { dateToKoreanString } from '../utils/dateAndTime';
import LoadingModal from '../components/LoadingModal/LoadingModal';

function WritingSubmit() {
  const navigate = useNavigate();
  const {
    studentId,
    score,
    setScore,
    writing,
    handleConfirmBtnClick,
    handleModifyBtnClick,
    handleRejectBtnClick,
    isSubmittedWritingLoading
  } = useSubmittedWriting();
  
  return (
    <main className="writing-submit">
      <LoadingModal show={isSubmittedWritingLoading} />
      <header>
        <span onClick={() => { navigate(-1) }}>
          <img src={backIcon} alt="back-icon" />
          뒤로가기
        </span>
        <span className="chat-header-text">{ studentId }</span>
      </header>
      <section>
        <section>
          <div className='score-input-wrapper'>
            <label htmlFor="score" className="title-badge">채점</label>
            <input 
              type="number" 
              id="score" 
              defaultValue={score}
              placeholder="점수를 입력해주세요." 
              min={0} 
              onChange={(e) => { setScore(e.target.value) }} />
          </div>
          <div>
            {!score ? (
              <button className="btn confirm" onClick={handleConfirmBtnClick}>확인</button>
            ) : (
              <button className="btn modify" onClick={handleModifyBtnClick}>수정하기</button>
            )}
            <button className="btn reject" onClick={handleRejectBtnClick}>부정제출</button>
          </div>
        </section>
        <section>
          <span className="title-badge">글</span>
          <article>
          {dateToKoreanString(writing.createdAt)}
          </article>
          <article className='writing-submit-content'>
            { writing.content || "글을 가져오는 중입니다..." }
          </article>
        </section>
      </section>
    </main>
  )
}

export default WritingSubmit;