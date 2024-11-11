import { useCookies } from 'react-cookie';
import { getWritingList, postWriting } from '../../../../api/writingApi';
import { useState } from "react";
import useAssignmentStore from '../../../../store/useAssignmentStore';
import { useWritingListStore } from '../../../../store/useWritingListStore';

function useCreateWriting() {
  const [cookies] = useCookies(['accessToken']);
  const setWritingList = useWritingListStore((state) => state.setWritingList);
  const { assignmentData } = useAssignmentStore();
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const handleCreateButtonClick = () => {  
    const sendData = {
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

    setIsCreateLoading(true);
    postWriting(sendData, cookies.accessToken)
      .then(() => {
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
  };

  return {
    handleCreateButtonClick,
    isCreateLoading
  };
}

export default useCreateWriting;
