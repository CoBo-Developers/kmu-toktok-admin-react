import { useEffect, useState } from 'react';
import { getWritingSubmit, patchWritingState } from '../api/writingApi';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

function useSubmittedWriting() {
  const { writingId, studentId } = useParams();
  const [ writing, setWriting ] = useState();
  const [ cookies ] = useCookies(['accessToken']);
  const [ score, setScore ] = useState();

  useEffect(() => {
    getWritingSubmit(writingId, studentId, cookies.accessToken)
    .then((res) => {
      setWriting(res.data.content);
    })
    .catch((err) => {
      alert(err.message);
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

    try {
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
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

    try {
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
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

    try {
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
  }

  return {
    studentId,
    score,
    setScore,
    writing,
    handleConfirmBtnClick,
    handleModifyBtnClick,
    handleRejectBtnClick
  }
}

export default useSubmittedWriting;