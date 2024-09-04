import { useEffect, useState } from "react";
import { getUserList } from "../api/userApi";
import { useCookies } from "react-cookie";
import { useUserListStore } from "../store/useUserStore";

function useUserList() {
  const userList = useUserListStore((state) => state.userList);
  const setUserList = useUserListStore((state) => state.setUserList);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [ totalElement, setTotalElement ] = useState(0);
  const [cookies] = useCookies(['accessToken']);
  const [isUserListLoading, setIsUserListLoading] = useState(false);

  useEffect(() => {
    setIsUserListLoading(true);
    getUserList(page, 10, cookies.accessToken)
    .then((result) => {
      setUserList(result.data.users);
      setTotalElement(result.data.totalElements);
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => {
      setIsUserListLoading(false);
    });
  }, []);

  return { userList, page, setPage, totalElement, pageSize, setPageSize, isUserListLoading };
}

export default useUserList;