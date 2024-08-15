import useWritingList from '../../../hooks/useWritingList';
import { handleTextareaChange } from '../../../utils/textareaHandler';
import './CreateNewWriting.css';
import { useState } from "react"

function CreateNewWriting() {
  const [onCreate, setOnCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [score, setScore] = useState();


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  
  const handleDescriptionChange = (e) => {
    handleTextareaChange(e);
    setDescription(e.target.value);
  }

  const handleConstraintsChange = (e) => {
    handleTextareaChange(e);
    setConstraints(e.target.value);
  }

  const handleScoreChange = (e) => {
    if (isNaN(e.target.value)) {
      e.preventDefault();
    } else {
      setScore(e.target.value);
    }
  }

  const handleButtonClick = () => {
    if (title.trim().length <= 0) {
      alert('제목을 입력해주세요.');
      return ;
    }

    if (description.trim().length <= 0) {
      alert('설명을 입력해주세요.');
      return ;
    }

    if (!score || parseInt(score) < 0) {
      alert('점수는 0점 이상이어야 합니다.');
      return ;
    }

    if (title.trim().length <= 0) {
      alert('제목을 입력해주세요.');
      return ;
    }
  }


  return (
    <div>
      {
        onCreate ? 
          <section className="create-new-wrting">
            <article className="input">
              <label htmlFor="title">제목</label>
              <input type="text" placeholder="제목" onChange={handleTitleChange} />
            </article>
            <article className="textarea">
              <label htmlFor="description">설명</label>
              <textarea name="description" id="description" placeholder="설명" rows={1}
              onChange={handleDescriptionChange}></textarea>
            </article>
            <article className="textarea">
              <label htmlFor="constraints">규정</label>
              <textarea name="constraints" id="constraints" placeholder="규정" rows={1}
              onChange={handleConstraintsChange}></textarea>
            </article>
            <article className="input">
              <label htmlFor="score">총점</label>
              <input type="number" name="score" id="score" onChange={handleScoreChange} />
            </article>
            <article className="due-date-wrapper">
              <h5 htmlFor="due-date">기한</h5>
              <section className="start-date-wrapper">
                <label htmlFor="start-date">시작일</label>
                <div>
                  <span>
                    <input type="text" maxLength={4} />년
                  </span>
                </div>
                <div>
                  <span><input type="text" maxLength={2} />월</span>
                  <span><input type="text" maxLength={2} />일</span>
                </div>
              </section>
              <section className="end-date-wrapper">
                <label htmlFor="end-date">마감일</label>
                <div>
                  <span>
                    <input type="text" maxLength={4} />년
                  </span>
                </div>
                <div>
                  <span><input type="text" maxLength={2} />월</span>
                  <span><input type="text" maxLength={2} />일</span>
                </div>
              </section>
            </article>
            <button onClick={handleButtonClick}>
              확인
            </button>
          </section> : 
          <button className="aside-writing-create-btn" onClick={() => { setOnCreate(true) }}>
            + 새로운 글쓰기 추가
          </button>
      }
    </div>
  )
}

export default CreateNewWriting