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
      <td>
        <div className='studentId-row'>{ studentId }</div>
        <div className='date-row'>{ dateToKoreanString(createdAt) }</div>
        <div className='writing-state-row'>{ writingStateEnum[writingState].text }</div>
      </td>
    </tr>
  )
}

export default WritingItem;