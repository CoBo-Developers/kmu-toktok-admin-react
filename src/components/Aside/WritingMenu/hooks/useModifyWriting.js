import { useCookies } from 'react-cookie';
import { getWritingList, putWriting } from '../../../../api/writingApi';
import { useState } from "react";
import useAssignmentStore from '../../../../store/useAssignmentStore';
import { useWritingListStore } from '../../../../store/useWritingListStore';

function useModifyWriting() {
  const [cookies] = useCookies(['accessToken']);
  const setWritingList = useWritingListStore((state) => state.setWritingList);
  const { assignmentData } = useAssignmentStore();
  const [isModifyLoading, setIsModifyLoading] = useState(false);

  const handleModifyButtonClick = () => {  
    const sendData = {
      id: assignmentData.id,
      title: assignmentData.title,
      description: assignmentData.description,
      score: Number(assignmentData.score),
      startDate: assignmentData.startDate.year + '-' +
           String(assignmentData.startDate.month).padStart(2, '0') + '-' +
           String(assignmentData.startDate.day).padStart(2, '0'),
      endDate: assignmentData.endDate.year + '-' +
           String(assignmentData.endDate.month).padStart(2, '0') + '-' +
           String(assignmentData.endDate.day).padStart(2, '0'),
      prompt: assignmentData.constraints
    };

    console.log(sendData);

    setIsModifyLoading(true);
    putWriting(sendData, cookies.accessToken)
      .then(() => {
        setIsModifyLoading(true);
        alert('과제가 수정되었습니다.');
        getWritingList(cookies.accessToken)
          .then((res) => {
            setWritingList(res.data.assignments);
          })
          .catch((err) => {
            alert(err.message);
          })
          .finally(() => {
            setIsModifyLoading(false);
          });
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsModifyLoading(false);
      });
  };

  return {
    handleModifyButtonClick,
    isModifyLoading
  };
}

export default useModifyWriting;
