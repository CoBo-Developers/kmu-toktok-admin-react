import { useEffect, useState } from 'react';
import { getWritingSubmit, patchWritingState } from '../api/writingApi';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

function useSubmittedWriting() {
  const { writingId, studentId } = useParams();
  const [ writing, setWriting ] = useState([]);
  const [ cookies ] = useCookies(['accessToken']);
  const [ score, setScore ] = useState();
  const [submittedWritingLoading, setSubmittedWritingLoading] = useState(true);

  useEffect(() => {
    setSubmittedWritingLoading(true);
    getWritingSubmit(writingId, studentId, cookies.accessToken)
    .then((res) => {
      setWriting(res.data);
      if (res.data.score) setScore(res.data.score);
    })
    .catch((err) => {
      alert(err.message);
    })
    .finally(() => {
      setSubmittedWritingLoading(false);
    })
  }, [])

  const handleConfirmBtnClick = async () => {
    if (!score) {
      alert('점수를 입력해주세요.');
      return ;
    }

    const dataForm = {
      assignmentId: writingId,
      studentId: studentId,
      writingState: 3,
      score: score
    }
    setSubmittedWritingLoading(true);
    try {
      setSubmittedWritingLoading(true);
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
    finally {
      setSubmittedWritingLoading(false);
    }
  }

  const handleModifyBtnClick = async () => {
    if (!score) {
      alert('점수를 입력해주세요.');
      return ;
    }

    const dataForm = {
      assignmentId: writingId,
      studentId: studentId,
      writingState: 3,
      score: score
    }
    setSubmittedWritingLoading(true);
    try {
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
    finally {
      setSubmittedWritingLoading(false);
    }
  }

  const handleRejectBtnClick = async () => {
    if (!score) {
      alert('점수를 입력해주세요.');
      return ;
    }

    const dataForm = {
      assignmentId: writingId,
      studentId: studentId,
      writingState: 2,
      score: 0
    }
    setSubmittedWritingLoading(true);
    try {
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
    finally {
      setSubmittedWritingLoading(false);
    }
  }

  return {
    studentId,
    score,
    setScore,
    writing,
    handleConfirmBtnClick,
    handleModifyBtnClick,
    handleRejectBtnClick,
    submittedWritingLoading
  }
}

export default useSubmittedWriting;