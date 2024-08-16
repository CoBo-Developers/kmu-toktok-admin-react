import { useCookies } from 'react-cookie';
import { getWritingList, postWriting } from '../../../api/writingApi';
import { dateToString } from '../../../utils/dateAndTime';
import { handleTextareaChange } from '../../../utils/textareaHandler';
import './CreateNewWriting.css';
import { useEffect, useState } from "react"
import useWritingList from '../../../hooks/useWritingList';
import { useWritingListStore } from '../../../store/useWritingListStore';

function CreateNewWriting() {
  const [onCreate, setOnCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [score, setScore] = useState();
  const [startDate, setStartDate] = useState({ year: null, month: null, day: null });
  const [endDate, setEndDate] = useState({ year: null, month: null, day: null });
  const [cookies] = useCookies(['accessToken']);
  const setWritingList = useWritingListStore((state) => state.setWritingList);


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

  const handleStartYearChange = (e) => {
    let startDateCopy = { ...startDate };
    startDateCopy.year = e.target.value;
    setStartDate(startDateCopy);
  }

  const handleStartMonthChange = (e) => {
    let startDateCopy = { ...startDate };
    startDateCopy.month = e.target.value;
    setStartDate(startDateCopy);
  }

  const handleStartDayChange = (e) => {
    let startDateCopy = { ...startDate };
    startDateCopy.day = e.target.value;
    setStartDate(startDateCopy);
  }

  const handleEndYearChange = (e) => {
    let endDateCopy = { ...endDate };
    endDateCopy.year = e.target.value;
    setEndDate(endDateCopy);
  }

  const handleEndMonthChange = (e) => {
    let endDateCopy = { ...endDate };
    endDateCopy.month = e.target.value;
    setEndDate(endDateCopy);
  }

  const handleEndDayChange = (e) => {
    let endDateCopy = { ...endDate };
    endDateCopy.day = e.target.value;
    setEndDate(endDateCopy);
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

    if (!startDate.year || 
      !startDate.month || 
      !startDate.day ||
      !endDate.year || 
      !endDate.month || 
      !endDate.day
    ) {
      alert('날짜를 입력해주세요.');
      return ;
    }

    const startDateFormat = new Date();
    startDateFormat.setFullYear(startDate.year);
    startDateFormat.setMonth(startDate.month - 1);
    startDateFormat.setDate(startDate.day);

    const endDateFormat = new Date();
    endDateFormat.setFullYear(endDate.year);
    endDateFormat.setMonth(endDate.month - 1);
    endDateFormat.setDate(endDate.day);

    if (startDateFormat > endDateFormat) {
      alert('마감일이 시작일보다 빠릅니다.');
    }

    const sendData = {
      "title": title,
      "description": description,
      "score": Number(score),
      "startDate": dateToString(startDateFormat),
      "endDate": dateToString(endDateFormat),
      "prompt": constraints
    }

    postWriting(sendData, cookies.accessToken)
    .then(() => {
      setOnCreate(false);
      getWritingList(cookies.accessToken)
        .then((res) => {
          setWritingList(res.data.assignments);
        })
        .catch((err) => {
          alert(err.message);
        })
    })
    .catch((err) => {
      alert(err.message);
    })
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