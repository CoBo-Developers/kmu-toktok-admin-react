import './WritingList.css';
import searchIcon from '../assets/icons/search-icon.png';
import WritingItem from '../components/list/WritingItem';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getWritingSubmitList } from '../api/writingApi';
import { useCookies } from 'react-cookie';
import MoreBtn from '../components/main/MoreBtn';
import useIsMobile from '../hooks/useIsMobile';
import WritingMenu from '../components/aside/WritingMenu/WritingMenu';

function WritingList() {
  const [writingList, setWritingList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElement, setTotalElement] = useState(0);
  const params = useParams();
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const isMobile = useIsMobile();


  useEffect(() => {
    if (cookies.accessToken) {
      getWritingSubmitList(params.writingId, page, 10, cookies.accessToken)
      .then((res) => {
        setWritingList(res.data.writings);
        setTotalElement(res.data.totalElements);
      })
      .catch((err) => {
        alert(err.message);
      })
    }    
  }, [cookies, params, page]);

  useEffect(() => {
    setPage(0);
  }, [location])

  return (
    <main className="writing-list">
      {isMobile && (
        <section>
          <WritingMenu />
        </section>
      )}
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
                    createdAt={item.createdAt}
                    writingState={item.writingState}
                  />
                )
              })
            }
          </tbody>
        </table>
      </section>
      <section className="more-btn-wrapper">
        { totalElement > pageSize ? <MoreBtn pageSize={pageSize} setPageSize={setPageSize} /> : null }
      </section>
    </main>
  )
}

export default WritingList;