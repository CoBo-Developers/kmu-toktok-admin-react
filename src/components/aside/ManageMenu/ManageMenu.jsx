import { useEffect, useState } from "react";
import useSeletectUserStore from "../../../store/useSeletedUserStore";
import './ManageMenu.css';
import { useNavigate } from "react-router-dom";

function ManageMenu() {
  const selectedUser = useSeletectUserStore((state) => state.seletedUser);
  const [selectedRole, setSelectedRole] = useState();
  const [inputId, setInputId] = useState();
  const [isModify, setIsModify] = useState(false);
  const navigate = useNavigate();

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
    // if (!isModify) {
      setIsModify(!isModify);
    // }
  }

  useEffect(() => {
    setSelectedRole(selectedUser.role);
    setInputId(selectedUser.studentId);
  }, [selectedUser])

  return (
    <section className='aside-user-manage'>
      <h2 className='aside-user-manage-title'>사용자 정보</h2>
      <div className='aside-user-manage-role-input'>
        <h5 className="aside-user-manage-input-title">역할</h5>
        <div className="aside-user-manage-ratio-container">
          <div className="aside-user-manage-ratio">
            <input type="radio" id="student" name="role" value="STUDENT" checked={selectedRole == "STUDENT" ? true : false} 
              onChange={handleRoleChange} disabled={isModify ? false : true} />
            <label htmlFor="student">학생</label>
          </div>
          <div className="aside-user-manage-ratio">
            <input type="radio" id="professor" name="role" value="PROFESSOR" checked={selectedRole == "PROFESSOR" ? true : false}
              onChange={handleRoleChange} disabled={isModify ? false : true} />
            <label htmlFor="professor">교수자</label>
          </div>
          <div className="aside-user-manage-ratio">
            <input type="radio" id="developer" name="role" value="DEVELOPER" checked={selectedRole == "DEVELOPER" ? true : false}
              onChange={handleRoleChange} disabled={isModify ? false : true} />
            <label htmlFor="developer">관리자</label>
          </div>
        </div>
      </div>
      <div className='aside-user-manage-id-input'>
        <label htmlFor="student-id">학번</label>
        <input type="text" name="student-id" id='student-id' value={inputId || ""} onChange={handleStudentIdChange} disabled={isModify ? false : true} />
      </div>
      <button className={'aside-user-manage-modify-btn ' + (isModify ? "active" : null)} onClick={handleClickModifyBtn}>정보 수정</button>
      <button className='aside-user-redirect-btn' onClick={() => {
        navigate('/manage/' + selectedUser.studentId);
      }}>챗봇과의 대화기록 보기</button>
      <button className='aside-user-redirect-btn' onClick={() => {
        navigate('/chatstu/' + selectedUser.studentId);
      }}>나와의 대화기록 보기</button>
    </section>
  )
}

export default ManageMenu;