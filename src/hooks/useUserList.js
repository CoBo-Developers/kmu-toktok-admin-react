import { useEffect, useState } from "react";
import { getUserList } from "../api/userApi";
import { useCookies } from "react-cookie";

function useUserList() {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    getUserList(page, 10, cookies.accessToken)
    .then((result) => {
      setUserList(result.data.users);
    })
    .catch((error) => {
      alert(error.message);
    })
  }, []);

  return { userList, setPage };
}

export default useUserList;