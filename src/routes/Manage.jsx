import './Manage.css';
import searchIcon from '../assets/icons/search-icon.png';
import useShowExtend from '../hooks/useShowExtend';
import UserItem from '../components/list/UserItem';
import useUserList from '../hooks/useUserList';

function Manage() {
  const showExtend = useShowExtend();
  const { userList, setPage } = useUserList();
  return (
    <main className={"manage " + (showExtend ? "active" : null)}>
      <section className='manage-search-wrapper'>
        <div className='search-input'>
          <input type="text" name="search" id="search" placeholder='검색...' />
          <button className='search-input-btn'>
            <img src={searchIcon} alt="search-icon" />
          </button>
        </div>
      </section>
      <section className='manage-user-list'>
        <table className='manage-user-list-table'>
          <tbody>
            {
              userList.map((item, i) => {
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
    </main>
  )
}

export default Manage;