import './WritingItem.css';
import arrowIcon from '../../assets/icons/arrow-icon.png';
import { writingStateEnum } from '../../utils/writingEnum';
import { useNavigate } from 'react-router-dom';

function WritingItem(props) {
  const {
    studentId,
    createdAt,
    writingState,
    writingId
  } = props;
  const navigate = useNavigate();

  const dateToKoreanString = (initialString) => {
    const dayToKorean = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    const dateObj = new Date(initialString);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const day = dateObj.getDay();

    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();

    const isAfternoon = ( hour > 12 ? true : false )

    const result = year + '년 ' + month + '월 ' + date + '일 ' + dayToKorean[day] + '(' + (isAfternoon ? '오후 ' : '오전 ')
                    + (isAfternoon ? (hour === 12 ? hour : (hour - 12)) : hour) + ':' 
                    + (0 + minute.toString()).slice(-2) + ")";

    return result;
  }

  return (
    <tr>
      <td>
        <div>
          <button onClick={() => { navigate(`/writing/${writingId}/${studentId}`) }}>
            <img src={arrowIcon} alt="arrow-icon" />
          </button>
        </div>
      </td>
      <td><div>{ studentId }</div></td>
      <td><div>{ dateToKoreanString(createdAt) }</div></td>
      <td><div>{ writingStateEnum[writingState].text }</div></td>
    </tr>
  )
}

export default WritingItem;