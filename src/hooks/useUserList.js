import { useEffect, useState } from "react";
import { getUserList } from "../api/userApi";

function useUserList() {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getUserList(page, 10)
    .then((result) => {
      setUserList(result);
    })
    .catch((error) => {
      alert(error.message);
    })
  }, []);

  return { userList, setPage };
}

export default useUserList;