import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getWritingList } from "../api/writingApi";

function useWritingList() {
  const [ cookies ] = useCookies(['accessToken']);
  const [ writingList, setWritingList ] = useState([]);

  useEffect(() => {
    getWritingList(cookies.accessToken)
      .then((res) => {
        setWritingList(res.data.assginments);
      })
      .catch((err) => {
        alert(err.message);
      })
  }, [cookies]);

  return { writingList };
}

export default useWritingList;