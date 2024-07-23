import { Link } from "react-router-dom";
import arrowIcon from '../../assets/icons/arrow-icon.png';
import useSeletectUserStore from "../../store/useSeletedUserStore";

function UserItem(props) {
  const { num, studentId, role } = props;
  const setSelectedUser = useSeletectUserStore((state) => state.setSelectedUser);
  return (
    <tr className='manage-user-list-item'>
      <td>{num}</td>
      <td>{studentId}</td>
      <td>
        <button className='manage-user-list-redirect-btn'>챗봇과의 대화기록 보기</button>
      </td>
      <td>
        <button className='manage-user-list-redirect-btn'>나와의 대화기록 보기</button>
      </td>
      <td>
        <Link onClick={(e) => {
          e.preventDefault();
          setSelectedUser(studentId, role);
        }}>
          자세히 보기 <img src={arrowIcon} alt="arrow-icon" />
        </Link>
      </td>
    </tr>
  )
}

export default UserItem;