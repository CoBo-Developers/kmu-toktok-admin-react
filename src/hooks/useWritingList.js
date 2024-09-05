import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getWritingList, deleteWriting } from "../api/writingApi";
import { useWritingListStore } from "../store/useWritingListStore";

function useWritingList() {
  const { writingList, setWritingList } = useWritingListStore();
  const [ cookies ] = useCookies(['accessToken']);
  const [writingLoading, setWritingLoading] = useState(false);

  useEffect(() => {
    setWritingLoading(true);
    getWritingList(cookies.accessToken)
      .then((res) => {
        setWritingList(res.data.assignments);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setWritingLoading(false);
      });
  }, [cookies]);

  const handleDelete = (id) => {
    setWritingLoading(true);
    deleteWriting(id, cookies.accessToken)
      .then(() => {
        setWritingList(writingList.filter(item => item.id !== id));
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setWritingLoading(false);
      });
  };


  return { writingList, writingLoading, handleDelete };
}

export default useWritingList;