import './Aside.css';
import tagIcon from '../../assets/icons/tag-icon.png';
import chatIcon from '../../assets/icons/chat-icon.png';
import personIcon from '../../assets/icons/person-icon.png';
import fileIcon from '../../assets/icons/file-icon.png';
import writingIcon from '../../assets/icons/writing-icon.png';
import managingIcon from '../../assets/icons/managing-icon.png';
import { Link } from 'react-router-dom';
import useCurrentPath from '../../hooks/useCurrentPath';
import ManageMenu from './ManageMenu/ManageMenu';

function Aside() {
  const currentPath = useCurrentPath();
  return (
    <aside>
      <section className='aside-menu'>
        <h1 className='aside-title'>kmu<br/>toktok-.</h1>
        <section className='aside-user-info'>
          <img className='aside-user-info-icon' src={tagIcon} alt="tag-icon" />
          <article className='aside-user-info-content'>
            <span className='aside-id'>2022123455</span>
            <span className='aside-logout'>로그아웃</span>
          </article>
        </section>
        <ul className='aside-menus'>
          <li className={'aside-menus-item ' + (currentPath === 'chatbot' ? 'active' : 'null')}>
            <Link to='/chatbot'>
              <img src={chatIcon} alt="chat-icon" />
              <span>챗봇과 대화하기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'chatstu' ? 'active' : 'null')}>
            <Link to='/chatstu'>
              <img src={personIcon} alt="person-icon" />
              <span>질문에 답변하기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'file' ? 'active' : 'null')}>
            <Link to='/file'>
              <img src={fileIcon} alt="file-icon" />
              <span>파일 목록 보기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'writing' ? 'active' : 'null')}>
            <Link to='writing'>
              <img src={writingIcon} alt="writing-icon" />
              <span>글쓰기 피드백하기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'manage' ? 'active' : 'null')}>
            <Link to='/manage'>
              <img src={managingIcon} alt="managing-icon" />
              <span>사용자 관리하기</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className={'aside-extend-menu ' + (
        currentPath === 'chatstu' || 
        currentPath === 'file' || 
        currentPath === 'manage' ?
        'active' : null
        )}>
          {
            currentPath === 'manage' ? 
            <ManageMenu /> : null
          }
        
      </section>
    </aside>
  )
}

export default Aside;