import './Manage.css';
import searchIcon from '../assets/icons/search-icon.png';
import useShowExtend from '../hooks/useShowExtend';
import UserItem from '../components/list/UserItem';

function Manage() {
  const showExtend = useShowExtend();
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
            <UserItem 
              num={1}
              studentId={5811032}
              role={'학생'}
              />
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Manage;