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
import LoadingModal from '../components/LoadingModal/LoadingModal';

function WritingList() {
  const [writingList, setWritingList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElement, setTotalElement] = useState(0);
  const params = useParams();
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isListLoading, setIsListLoading] = useState(false);

  useEffect(() => {
    if (!params.writingId) {
      return;
    }
    if (cookies.accessToken) {
      setIsListLoading(true);
      getWritingSubmitList(params.writingId, page, pageSize, cookies.accessToken)
      .then((res) => {
        setWritingList(res.data.writings);
        setTotalElement(res.data.totalElements);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsListLoading(false);
      })
    }    
  }, [cookies, params, pageSize]);

  useEffect(() => {
    setPage(0);
  }, [location])

  if (!params.writingId && !isMobile) {
    return null;
  }

  return (
    <main className="writing-list">
      <LoadingModal show={isListLoading} />
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
              <th>
                <div>학번</div>
                <div>제출일시</div>
                <div>채점상태</div>
              </th>
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