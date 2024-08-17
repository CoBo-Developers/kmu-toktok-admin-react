import './WritingItem.css';
import arrowIcon from '../../assets/icons/arrow-icon.png';
import arrowUpIcon from '../../assets/icons/arrow-up-icon.png';
import arrowDownIcon from '../../assets/icons/arrow-down-icon.png';
import { useState } from 'react';

function WritingItem() {
  const [showHistory, setShowHistory] = useState(false);

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
          2022123449
        </div>
      </td>
      <td>
        <div>
          2024년 7월 22일 월요일(오후 1:16)
        </div>
      </td>
      <td>
        <div>
          미제출
        </div>
      </td>
    </tr>
  )
}

export default WritingItem;