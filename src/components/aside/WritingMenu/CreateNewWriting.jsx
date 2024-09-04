import useCreateWriting from '../../../hooks/useCreateWriting';
import './CreateNewWriting.css';
import LoadingModal from '../../LoadingModal/LoadingModal';

function CreateNewWriting() {
  const {
    onCreate,
    setOnCreate,
    handleTitleChange,
    handleDescriptionChange,
    handleConstraintsChange,
    handleScoreChange,
    handleStartYearChange,
    handleStartMonthChange,
    handleStartDayChange,
    handleEndYearChange,
    handleEndMonthChange,
    handleEndDayChange,
    handleButtonClick,
    isCreateLoading
  } = useCreateWriting();

  return (
    <div>
      {
        onCreate ? 
          <section className="create-new-wrting">
            <LoadingModal show={isCreateLoading} />
            <article className="input">
              <label htmlFor="title">제목</label>
              <textarea name="title" id="title" placeholder="제목" rows={1}
              onChange={handleTitleChange}></textarea>
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
              <input type="number" name="score" id="score" onChange={handleScoreChange} min={0} />
            </article>
            <article className="due-date-wrapper">
              <h5 htmlFor="due-date">기한</h5>
              <section className="start-date-wrapper">
                <label htmlFor="start-date">시작일</label>
                <div>
                  <span>
                    <input type="number" maxLength={4} onChange={handleStartYearChange} />년
                  </span>
                </div>
                <div>
                  <span><input type="number" maxLength={2} onChange={handleStartMonthChange} />월</span>
                  <span><input type="number" maxLength={2} onChange={handleStartDayChange} />일</span>
                </div>
              </section>
              <section className="end-date-wrapper">
                <label htmlFor="end-date">마감일</label>
                <div>
                  <span>
                    <input type="number" maxLength={4} onChange={handleEndYearChange} />년
                  </span>
                </div>
                <div>
                  <span><input type="number" maxLength={2} onChange={handleEndMonthChange} />월</span>
                  <span><input type="number" maxLength={2} onChange={handleEndDayChange} />일</span>
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