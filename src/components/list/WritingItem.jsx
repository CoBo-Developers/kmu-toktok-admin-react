import './WritingItem.css';
import arrowIcon from '../../assets/icons/arrow-icon.png';
import { writingStateEnum } from '../../utils/writingEnum';
import { useNavigate } from 'react-router-dom';
import { dateToKoreanString } from '../../utils/dateAndTime';

function WritingItem(props) {
  const {
    studentId,
    createdAt,
    writingState,
    writingId
  } = props;
  const navigate = useNavigate();

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