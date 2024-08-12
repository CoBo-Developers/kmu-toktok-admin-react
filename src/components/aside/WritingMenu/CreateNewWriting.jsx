import { handleTextareaChange } from '../../../utils/textareaHandler';
import './CreateNewWriting.css';
import { useState } from "react"

function CreateNewWriting() {
  const [onCreate, setOnCreate] = useState(false);

  return (
    <div>
      {
        onCreate ? 
          <section className="create-new-wrting">
            <article className="input">
              <label htmlFor="title">제목</label>
              <input type="text" defaultValue={"1주차 추가과제"} placeholder="제목" />
            </article>
            <article className="textarea">
              <label htmlFor="description">설명</label>
              <textarea name="description" id="description" placeholder="설명" rows={1}
              onChange={handleTextareaChange}></textarea>
            </article>
            <article className="textarea">
              <label htmlFor="constraints">규정</label>
              <textarea name="constraints" id="constraints" placeholder="규정"
              onChange={handleTextareaChange}></textarea>
            </article>
            <article className="input">
              <label htmlFor="score">총점</label>
              <input type="text" name="score" id="score"/>
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
            <button>
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