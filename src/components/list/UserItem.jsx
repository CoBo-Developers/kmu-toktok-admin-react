import { Link, useNavigate } from "react-router-dom";
import arrowIcon from '../../assets/icons/arrow-icon.png';
import mobileGoDetailIcon from '../../assets/icons/mobile-go-detail-icon.png';
import useSeletectUserStore from "../../store/useSeletedUserStore";
import './UserItem.css';
import useIsMobile from "../../hooks/useIsMobile";

function UserItem(props) {
  const { num, studentId, role } = props;
  const setSelectedUser = useSeletectUserStore((state) => state.setSelectedUser);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <tr className='manage-user-list-item'>
      <td className="num">{num}</td>
      <td className="content-row">
        <span className="studentId-col">{studentId}</span>
        <div className="button-col">
          <button className='manage-user-list-redirect-btn' onClick={() => {
            navigate('/manage/' + studentId);
          }}>챗봇과의 대화기록 보기</button>
          <button className='manage-user-list-redirect-btn' onClick={() => {
            navigate('/chatstu/' + studentId);
          }}
          >나와의 대화기록 보기</button>
        </div>
        {isMobile ? (
          <img src={mobileGoDetailIcon} 
               alt="mobile-go-detail-icon" 
               className="mobile-go-detail-icon" 
               onClick={(e) => {
                e.preventDefault();
                setSelectedUser(studentId, role);
               }} />
        ): (
        <Link className="manage-user-detail" onClick={(e) => {
            e.preventDefault();
            setSelectedUser(studentId, role);
          }}>
            자세히 보기 <img src={arrowIcon} alt="arrow-icon" />
        </Link>
        )}
      </td>
    </tr>
  )
}

export default UserItem;