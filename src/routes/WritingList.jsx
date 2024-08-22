import './WritingList.css';
import searchIcon from '../assets/icons/search-icon.png';
import WritingItem from '../components/list/WritingItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWritingSubmitList } from '../api/writingApi';
import { useCookies } from 'react-cookie';

function WritingList() {
  const [writingList, setWritingList] = useState([]);
  const params = useParams();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    if (cookies.accessToken) {
      getWritingSubmitList(params.writingId, 0, 10, cookies.accessToken)
      .then((res) => {
        setWritingList(res.data.writings);
      })
      .catch((err) => {
        alert(err.message);
      })
    }    
  }, [cookies, params]);

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
              <th>채점상태</th>
            </tr>
          </thead>
          <tbody>
            {
              writingList.map((item, i) => {
                return (
                  <WritingItem
                    key={i}
                    writingId={params.writingId}
                    studentId={item.studentId}
                    updatedAt={item.updatedAt}
                    writingState={item.writingState}
                  />
                )
              })
            }
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default WritingList;