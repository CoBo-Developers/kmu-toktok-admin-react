import './WritingItem.css';
import arrowIcon from '../../assets/icons/arrow-icon.png';
import { writingStateEnum } from '../../utils/writingEnum';

function WritingItem(props) {
  const {
    studentId,
    updatedAt,
    writingState
  } = props;

  return (
    <tr>
      <td>
        <div>
          <button>
            <img src={arrowIcon} alt="arrow-icon" />
          </button>
        </div>
      </td>
      <td>
        <div>
          {studentId}
        </div>
      </td>
      <td>
        <div>
          2024년 7월 22일 월요일(오후 1:16)
        </div>
      </td>
      <td>
        <div>
          { writingStateEnum[writingState] }
        </div>
      </td>
    </tr>
  )
}

export default WritingItem;