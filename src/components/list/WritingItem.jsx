import './WritingItem.css';
import arrowIcon from '../../assets/icons/arrow-icon.png';
import { writingStateEnum } from '../../utils/writingEnum';
import { useNavigate } from 'react-router-dom';

function WritingItem(props) {
  const {
    studentId,
    updatedAt,
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
        <div>
          { studentId }
        </div>
      </td>
      <td>
        <div>
          2024년 7월 22일 월요일(오후 1:16)
        </div>
      </td>
      <td>
        <div>
          { writingStateEnum[writingState].text }
        </div>
      </td>
    </tr>
  )
}

export default WritingItem;