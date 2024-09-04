import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getWritingList } from "../api/writingApi";
import { useWritingListStore } from "../store/useWritingListStore";

function useWritingList() {
  const { writingList, setWritingList } = useWritingListStore();
  const [ cookies ] = useCookies(['accessToken']);

  useEffect(() => {
    getWritingList(cookies.accessToken)
      .then((res) => {
        setWritingList(res.data.assignments);
      })
      .catch((err) => {
        alert(err.message);
      })
  }, [cookies]);

  return { writingList };
}

export default useWritingList;