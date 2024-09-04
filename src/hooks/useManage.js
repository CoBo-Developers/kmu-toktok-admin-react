import useSeletectUserStore from "../store/useSeletedUserStore";
import { useEffect, useState } from "react";
import { useUserListStore } from "../store/useUserStore";
import { useCookies } from "react-cookie";
import { getUserList, putUser } from "../api/userApi";

function useManage() {
  const selectedUser = useSeletectUserStore((state) => state.seletedUser);
  const setUserList = useUserListStore((state) => state.setUserList);
  const [selectedRole, setSelectedRole] = useState();
  const [inputId, setInputId] = useState();
  const [isModify, setIsModify] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  const [isManageLoading, setIsManageLoading] = useState(false);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  }

  const handleStudentIdChange = (e) => {
    if (isNaN(e.target.value)) {
      e.preventDefault();
    } else {
      setInputId(e.target.value);
    }
  }

  const handleClickModifyBtn = () => {
    if (!isModify) {
      setIsModify(!isModify);
    } else {
      setIsManageLoading(true);
      putUser(selectedUser.studentId, selectedUser.registerState, selectedRole, inputId, cookies.accessToken)
        .then(() => {
          alert('수정되었습니다.');
          setIsModify(false);
          getUserList(0, 10, cookies.accessToken)
            .then((res) => {
              setUserList(res.data.users);
            })
            .catch((error) => {
              alert(error.message);
            })
            .finally(() => {
              setIsManageLoading(false);
            })
        })
        .catch((error) => {
          alert(error.message);
        })
    }
  }

  useEffect(() => {
    setSelectedRole(selectedUser.role);
    setInputId(selectedUser.studentId);
  }, [selectedUser])

  return {
    selectedUser,
    selectedRole,
    isModify,
    inputId,
    handleRoleChange,
    handleStudentIdChange,
    handleClickModifyBtn,
    isManageLoading
  }
}

export default useManage;