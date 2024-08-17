import './WritingList.css';
import searchIcon from '../assets/icons/search-icon.png';
import arrowIcon from '../assets/icons/arrow-icon.png';
import arrowUpIcon from '../assets/icons/arrow-up-icon.png';
import arrowDownIcon from '../assets/icons/arrow-down-icon.png';
import { useState } from 'react';

function WritingList() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <main className="writing-list">
      <section className='writing-search-wrapper'>
        <div className='search-input'>
          <input type="text" name="search" id="search" placeholder='검색...' />
          <button className='search-input-btn'>
            <img src={searchIcon} alt="search-icon" />
          </button>
        </div>
      </section>
      <section className='writing-list-wrapper'>
        <table className='writing-list-table'>
          <thead>
            <tr>
              <th>채점하기</th>
              <th>학번</th>
              <th>제출일시</th>
              <th>다시 제출한 횟수</th>
              <th>채점상태</th>
            </tr>
          </thead>
          <tbody>
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
                  3회
                  <button onClick={() => {
                    setShowHistory(!showHistory);
                  }}>
                    {
                      showHistory ? <img src={arrowUpIcon} alt="arrow-up-icon" /> : <img src={arrowDownIcon} alt="arrow-down-icon" />
                    }
                    
                  </button>
                </div>
                {
                  showHistory ? <div className="hidden-history">
                  <ul>
                    <li>2024년 7월 22일 월요일(13:16)</li>
                    <li>2024년 7월 22일 월요일(13:16)</li>
                    <li>2024년 7월 22일 월요일(13:16)</li>
                  </ul>
                </div> : null
                }
              </td>
              <td>
                <div>
                  미제출
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default WritingList;