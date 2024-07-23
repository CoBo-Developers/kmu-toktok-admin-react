import useSeletectUserStore from "../../../store/useSeletedUserStore";

function ManageMenu() {
  const selectedUser = useSeletectUserStore((state) => state.seletedUser);

  return (
    <section className='aside-user-manage'>
      <h2 className='aside-user-manage-title'>사용자 정보</h2>
      <div className='aside-user-manage-input'>
        <label htmlFor="name">역할</label>
        <input type="text" name="name" id="name" value={selectedUser.role} disabled />
      </div>
      <div className='aside-user-manage-input'>
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