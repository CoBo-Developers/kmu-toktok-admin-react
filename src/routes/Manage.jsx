import { Link } from 'react-router-dom';
import './Manage.css';
import arrowIcon from '../assets/icons/arrow-icon.png';
import searchIcon from '../assets/icons/search-icon.png';
import useSeletectUserStore from '../store/useSeletedUserStore';

function Manage() {
  const setSelectedUser = useSeletectUserStore((state) => state.setSelectedUser);
  return (
    <main className="manage">
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
            <tr className='manage-user-list-item'>
              <td>1</td>
              <td>2022123455</td>
              <td>
                <button className='manage-user-list-redirect-btn'>챗봇과의 대화기록 보기</button>
              </td>
              <td>
                <button className='manage-user-list-redirect-btn'>나와의 대화기록 보기</button>
              </td>
              <td>
                <Link onClick={(e) => {
                  e.preventDefault();
                  setSelectedUser('2018117835', '관리자');
                }}>
                  자세히 보기 <img src={arrowIcon} alt="arrow-icon" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Manage;