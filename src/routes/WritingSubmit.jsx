import './WritingSubmit.css';
import backIcon from '../assets/icons/back-icon.png';
import { useNavigate, useParams } from "react-router-dom";

function WritingSubmit() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <main className="writing-submit">
      <header>
        <span onClick={() => { navigate(-1) }}>
          <img src={backIcon} alt="back-icon" />
          뒤로가기
        </span>
        <span className="chat-header-text">{params.studentId}</span>
      </header>
      <section>
        <section>
          <label htmlFor="score" className="title-badge">채점</label>
          <input type="number" id="score" placeholder="점수를 입력해주세요." min={0} />
          <div>
            <button className="btn confirm">확인</button>
            <button className="btn modify">수정하기</button>
            <button className="btn reject">부정제출</button>
          </div>
        </section>
        <section>
          <span className="title-badge">글</span>
          <article>
            2024년 7월 22일 월요일(오후 2:54)
          </article>
          <article>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula dictum odio, et auctor sapien fermentum vel. Integer auctor diam ac malesuada aliquam. Suspendisse ut orci in magna facilisis volutpat. Donec consequat, risus non volutpat dignissim, erat erat suscipit libero, vel lacinia orci risus eget turpis. Proin nec ligula nec purus auctor pretium ac nec mauris. Nam vel semper nunc. Sed vel convallis nisi. Mauris et dictum velit, eu tristique libero. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula dictum odio, et auctor sapien fermentum vel. Integer auctor diam ac malesuada aliquam. Suspendisse ut orci in magna facilisis volutpat. Donec consequat, risus non volutpat dignissim, erat erat suscipit libero, vel lacinia orci risus eget turpis. Proin nec ligula nec purus auctor pretium ac nec mauris. Nam vel semper nunc. Sed vel convallis nisi. Mauris et dictum velit, eu tristique libero. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula dictum odio, et auctor sapien fermentum vel. Integer auctor diam ac malesuada aliquam. Suspendisse ut orci in magna facilisis volutpat. Donec consequat, risus non volutpat dignissim, erat erat suscipit libero, vel lacinia orci risus eget turpis. Proin nec ligula nec purus auctor pretium ac nec mauris. Nam vel semper nunc. Sed vel convallis nisi. Mauris et dictum velit, eu tristique libero. In hac habitasse platea dictumst.
          </article>
        </section>
      </section>
    </main>
  )
}

export default WritingSubmit;