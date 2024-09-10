import { useEffect, useState } from "react";
import { getUserList, searchUser } from "../api/userApi";
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
  const [searchStr, setSearchStr] = useState("");

  const getUserListData = () => {
    setIsUserListLoading(true);

    const api = searchStr
      ? searchUser(cookies.accessToken, searchStr, pageSize, page)
      : getUserList(page, pageSize, cookies.accessToken);

    api
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
  };

  useEffect(() => {
    getUserListData();
  }, [pageSize]);

  const handleSearchBtn = () => {
    setPage(0); 
    setPageSize(10);
    setUserList([]);
    getUserListData();
  };

  return {
    userList,
    totalElement,
    pageSize,
    setPageSize,
    isUserListLoading,
    handleSearchBtn,
    searchStr,
    setSearchStr,
  };
}
export default useUserList;