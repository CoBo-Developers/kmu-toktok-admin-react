import "./Testing.css";
import leftArrow from "../../assets/icons/left-arrow.svg";
import useTesting from "./hooks/useTesting";

function Testing() {
  const { 
    constraintsRef, 
    writingRef,
    writingContent,
    handleWritingChange,
    constraintsContent,
    handleConstraintsChange,
    feedbackContent,
    getFeedback,
  } = useTesting();

  return (
    <main className="testing-main">
      <header className="testing-header">
        <span>피드백 테스트</span>
      </header>
      <section className="testing-content">
        <button className="testing-btn" onClick={getFeedback}>
          테스트 시작
        </button>
        <article className="constraints-container">
          <div>
            <img src={leftArrow} alt="left-arrow" />
            <span>규정 입력하기</span>
          </div>
          <textarea
            name="constraints-content"
            id="constraints-content"
            rows={1}
            ref={constraintsRef}
            value={constraintsContent}
            onChange={handleConstraintsChange}
          />
        </article>
        <article className="content-container">
          <div className="writing-wrapper">
            <div>
              <span className="label">나의 글</span>
            </div>
            <textarea
              name="writing-content"
              id="writing-content"
              rows={1}
              ref={writingRef}
              value={writingContent}
              onChange={handleWritingChange}
            />
          </div>
          <hr />
          <div className="feedback-wrapper">
            <div>
              <span className="label">피드백</span>
            </div>
            <p className="feedback-content">{feedbackContent}</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Testing;
