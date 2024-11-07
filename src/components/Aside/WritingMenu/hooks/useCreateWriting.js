import { useCookies } from 'react-cookie';
import { getWritingList, postWriting } from '../../../../api/writingApi';
import { dateToString } from '../../../../utils/dateAndTime';
import { handleTextareaChange } from '../../../../utils/textareaHandler';
import { useState } from "react"
import { useWritingListStore } from '../../../../store/useWritingListStore';

function useCreateWriting() {
  const [onCreate, setOnCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [score, setScore] = useState();
  const [startDate, setStartDate] = useState({ year: null, month: null, day: null });
  const [endDate, setEndDate] = useState({ year: null, month: null, day: null });
  const [cookies] = useCookies(['accessToken']);
  const setWritingList = useWritingListStore((state) => state.setWritingList);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const handleTitleChange = (e) => {
    handleTextareaChange(e);
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

    setIsCreateLoading(true);
    postWriting(sendData, cookies.accessToken)
    .then(() => {
      setOnCreate(false);
      setIsCreateLoading(true);
      getWritingList(cookies.accessToken)
        .then((res) => {
          setWritingList(res.data.assignments);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          setIsCreateLoading(false);
        });
    })
    .catch((err) => {
      alert(err.message);
    })
    .finally(() => {
      setIsCreateLoading(false);
    });
  }

  return {
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
  }
}

export default useCreateWriting;