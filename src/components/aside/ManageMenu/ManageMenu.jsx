import useSeletectUserStore from "../../../store/useSeletedUserStore";
import './ManageMenu.css';

function ManageMenu() {
  const selectedUser = useSeletectUserStore((state) => state.seletedUser);

  return (
    <section className='aside-user-manage'>
      <h2 className='aside-user-manage-title'>사용자 정보</h2>
      <div className='aside-user-manage-role-input'>
        <h5 className="aside-user-manage-input-title">역할</h5>
        <div className="aside-user-manage-ratio-container">
          <div className="aside-user-manage-ratio">
            <input type="radio" id="student" name="role" value="STUDENT" disabled checked />
            <label htmlFor="student">학생</label>
          </div>
          <div className="aside-user-manage-ratio">
            <input type="radio" id="professor" name="role" value="PROFESSOR" disabled />
            <label htmlFor="professor">교수자</label>
          </div>
          <div className="aside-user-manage-ratio">
            <input type="radio" id="developer" name="role" value="DEVELOPER" disabled />
            <label htmlFor="developer">관리자</label>
          </div>
        </div>
      </div>
      <div className='aside-user-manage-id-input'>
        <label htmlFor="student-id">학번</label>
        <input type="text" name="student-id" id='student-id' value={selectedUser.studentId} disabled />
      </div>
      <button className='aside-user-manage-modify-btn'>정보 수정</button>
      <button className='aside-user-redirect-btn'>챗봇과의 대화기록 보기</button>
      <button className='aside-user-redirect-btn'>나와의 대화기록 보기</button>
    </section>
  )
}

export default ManageMenu;