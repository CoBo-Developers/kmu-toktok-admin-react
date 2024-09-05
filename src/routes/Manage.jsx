import { useState, useEffect } from 'react';
import './Manage.css';
import searchIcon from '../assets/icons/search-icon.png';
import useShowExtend from '../hooks/useShowExtend';
import UserItem from '../components/list/UserItem';
import useUserList from '../hooks/useUserList';
import MoreBtn from '../components/main/MoreBtn';
import useIsMobile from '../hooks/useIsMobile';
import ManageMenu from '../components/aside/ManageMenu/ManageMenu';
import LoadingModal from '../components/LoadingModal/LoadingModal';

function Manage() {
  const showExtend = useShowExtend();
  const { userList, page, setPage, totalElement, pageSize, setPageSize, isUserListLoading } = useUserList();
  const isMobile = useIsMobile();
  const [searchStr, setSearchStr] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);

  useEffect(() => {
    setFilteredUserList(userList);
  }, [userList]);

  const handleSearchBtn = () => {
    const filteredList = userList.filter(user => 
      user.studentId.includes(searchStr)
    );
    setFilteredUserList(filteredList);
  };

  return (
    <>
    <LoadingModal show={isUserListLoading} />
    {isMobile && (
      <section className='mobile-manage-menu'>
        <ManageMenu />
      </section>
    )}
    <main className={"manage " + (showExtend ? "active" : "")}>
      <section className='manage-search-wrapper'>
        <div className='search-input'>
          <input type="text" 
          name="search" 
          id="search" 
          placeholder='검색...' 
          value={searchStr}
          onChange={(e)=>setSearchStr(e.target.value)}
          onKeyDown={(e)=>{
            if (e.key === 'Enter') {
              handleSearchBtn();
            }
          }}
          />
          <button className='search-input-btn' onClick={handleSearchBtn}><img src={searchIcon} alt="search-icon" /></button>
        </div>
      </section>
      <section className='manage-user-list'>
        <table className='manage-user-list-table'>
          <tbody>
            {
              filteredUserList.map((item, i) => {
                if (item.studentId) 
                  return <UserItem 
                            key={i}
                            num={i + 1}
                            studentId={item.studentId}
                            role={item.role}
                            />
                })
            }
          </tbody>
        </table>
      </section>
      <section className="more-btn-wrapper">
        { totalElement > pageSize ? <MoreBtn pageSize={pageSize} setPageSize={setPageSize} /> : null }
      </section>
    </main>
    </>
  )
}

export default Manage;