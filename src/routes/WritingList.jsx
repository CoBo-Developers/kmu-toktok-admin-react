import './WritingList.css';
import searchIcon from '../assets/icons/search-icon.png';

import WritingItem from '../components/list/WritingItem';

function WritingList() {
  

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
            <WritingItem />
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default WritingList;