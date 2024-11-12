import { handleTextareaChange } from '../../../../utils/textareaHandler';
import useAssignmentStore from '../../../../store/useAssignmentStore';
import { useEffect } from 'react';

function useWritingForm(initialData) {
  const { assignmentData, setAssignmentData } = useAssignmentStore();
  useEffect(() => {
    if (initialData) {
      const start = initialData.startDate.split('-');
      const end = initialData.endDate.split('-');
      setAssignmentData({
        id: initialData.id,
        title: initialData.title,
        description: initialData.description,
        constraints: initialData.prompt,
        score: initialData.score,
        startDate: { year: start[0], month: start[1], day: start[2] },
        endDate: { year: end[0], month: end[1], day: end[2] }
      });
    }
    else{
      setAssignmentData({
        id: null,
        title: '',
        description: '',
        constraints: '',
        score: '',
        startDate: { year: '', month: '', day: '' },
        endDate: { year: '', month: '', day: '' }
      });
    }
  }, [initialData]);

  useEffect(() => {
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }, [assignmentData]);

  const handleTitleChange = (e) => {
    handleTextareaChange(e);
    setAssignmentData({ title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    handleTextareaChange(e);
    setAssignmentData({ description: e.target.value });
  };

  const handleConstraintsChange = (e) => {
    handleTextareaChange(e);
    setAssignmentData({ constraints: e.target.value });
  };

  const handleScoreChange = (e) => {
    if (isNaN(e.target.value)) {
      e.preventDefault();
    } else {
      setAssignmentData({ score: e.target.value });
    }
  };

  const handleStartYearChange = (e) => {
    let startDateCopy = { ...assignmentData.startDate };
    startDateCopy.year = e.target.value;
    setAssignmentData({ startDate: startDateCopy });
  };

  const handleStartMonthChange = (e) => {
    let startDateCopy = { ...assignmentData.startDate };
    startDateCopy.month = e.target.value;
    setAssignmentData({ startDate: startDateCopy });
  };

  const handleStartDayChange = (e) => {
    let startDateCopy = { ...assignmentData.startDate };
    startDateCopy.day = e.target.value;
    setAssignmentData({ startDate: startDateCopy });
  };

  const handleEndYearChange = (e) => {
    let endDateCopy = { ...assignmentData.endDate };
    endDateCopy.year = e.target.value;
    setAssignmentData({ endDate: endDateCopy });
  };

  const handleEndMonthChange = (e) => {
    let endDateCopy = { ...assignmentData.endDate };
    endDateCopy.month = e.target.value;
    setAssignmentData({ endDate: endDateCopy });
  };

  const handleEndDayChange = (e) => {
    let endDateCopy = { ...assignmentData.endDate};
    endDateCopy.day = e.target.value;
    setAssignmentData({ endDate: endDateCopy });
  };

  const checkInfo = () => {
    if (assignmentData.title.trim().length <= 0) {
      alert('제목을 입력해주세요.');
      return false;
    }

    if (assignmentData.description.trim().length <= 0) {
      alert('설명을 입력해주세요.');
      return false;
    }

    if (!assignmentData.score || parseInt(assignmentData.score) < 0) {
      alert('점수는 0점 이상이어야 합니다.');
      return false;
    }

    if (!assignmentData.startDate.year || !assignmentData.startDate.month || !assignmentData.startDate.day || !assignmentData.endDate.year || !assignmentData.endDate.month || !assignmentData.endDate.day) {
      alert('날짜를 입력해주세요.');
      return false;
    }

    const startDateFormat = new Date();
    startDateFormat.setFullYear(assignmentData.startDate.year);
    startDateFormat.setMonth(assignmentData.startDate.month - 1);
    startDateFormat.setDate(assignmentData.startDate.day);

    const endDateFormat = new Date();
    endDateFormat.setFullYear(assignmentData.endDate.year);
    endDateFormat.setMonth(assignmentData.endDate.month - 1);
    endDateFormat.setDate(assignmentData.endDate.day);

    if (startDateFormat > endDateFormat) {
      alert('마감일이 시작일보다 빠릅니다.');
      return false;
    }
    return true;
  };

  return {
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
    checkInfo,
  };
}

export default useWritingForm;
