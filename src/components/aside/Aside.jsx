import { useState } from 'react';
import './Aside.css';
import tagIcon from '../../assets/icons/tag-icon.png';
import chatIcon from '../../assets/icons/chat-icon.png';
import personIcon from '../../assets/icons/person-icon.png';
import fileIcon from '../../assets/icons/file-icon.png';
import writingIcon from '../../assets/icons/writing-icon.png';
import mobileAsideIcon from '../../assets/icons/mobile-aside-icon.png';
import managingIcon from '../../assets/icons/managing-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import useCurrentPath from '../../hooks/useCurrentPath';
import ManageMenu from './ManageMenu/ManageMenu';
import ChatStuMenu from './ChatStuMenu/ChatStuMenu';
import useShowExtend from '../../hooks/useShowExtend';
import WritingMenu from './WritingMenu/WritingMenu';
import { useCookies } from 'react-cookie';
import FileMenu from './FileMenu/FileMenu';
import useIsMobile from '../../hooks/useIsMobile';

function Aside() {
  const [cookies] = useCookies(['studentId']);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const currentPath = useCurrentPath();
  const navigate = useNavigate();
  const showExtend = useShowExtend();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    const cookies = ['accessToken', 'refreshToken', 'isActive', 'studentId'];

    cookies.forEach(cookie => {
      document.cookie = `${cookie}=; path=/; max-age=0`;
    });

    navigate('/');
  };

  return (
    <aside className='aside'>
      <section className={`mobile-aside-menu ${isMenuVisible ? 'visible' : ''}`}>
        <h1 className='aside-title'>kmu toktok-.</h1>
        <img
          className='mobile-aside-icon'
          src={mobileAsideIcon}
          alt="mobile-aside-icon"
          onClick={()=>setMenuVisible(!isMenuVisible)}
        />
      </section>
      <section className={`aside-menu ${isMenuVisible ? 'visible' : ''}`}>
        <h1 className='aside-title'>kmu<br/>toktok-.</h1>
        <section className='aside-user-info'>
          <img className='aside-user-info-icon' src={tagIcon} alt="tag-icon" />
          <article className='aside-user-info-content'>
            <span className='aside-id'>{cookies.studentId || ' '}</span>
            <span className='aside-logout' onClick={handleLogout}>로그아웃</span>
          </article>
        </section>
        <ul className='aside-menus'>
          <li className={'aside-menus-item ' + (currentPath === 'chatbot' ? 'active' : 'null')}>
            <Link to='/chatbot' onClick={()=>setMenuVisible(!isMenuVisible)}>
              <img src={chatIcon} alt="chat-icon" />
              <span>챗봇과 대화하기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'chatstu' ? 'active' : 'null')}>
            <Link to='/chatstu' onClick={()=>setMenuVisible(!isMenuVisible)}>
              <img src={personIcon} alt="person-icon" />
              <span>질문에 답변하기</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'file' ? 'active' : 'null')}>
            <Link to='/file' onClick={()=>setMenuVisible(!isMenuVisible)}>
              <img src={fileIcon} alt="file-icon" />
              <span>활동안내 관리</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'writing' ? 'active' : 'null')}>
            <Link to='/writing' onClick={()=>setMenuVisible(!isMenuVisible)}>
              <img src={writingIcon} alt="writing-icon" />
              <span>학습활동 관리</span>
            </Link>
          </li>
          <li className={'aside-menus-item ' + (currentPath === 'manage' ? 'active' : 'null')}>
            <Link to='/manage' onClick={()=>setMenuVisible(!isMenuVisible)}>
              <img src={managingIcon} alt="managing-icon" />
              <span>사용자 관리하기</span>
            </Link>
          </li>
        </ul>
      </section>
      {!isMobile && (
        <section className={'aside-extend-menu ' + (
          showExtend ?
          'active' : null
          )}>
          {
            currentPath === 'manage' ? 
            <ManageMenu /> : null
          }
          {
            currentPath === 'chatstu' ? 
            <ChatStuMenu /> : null
          }
          {
            currentPath === 'writing' ? 
            <WritingMenu /> : null
          }
          {
            currentPath === 'file' ? 
            <FileMenu /> : null
          }
        </section>
      )}
    </aside>
  )
}

export default Aside;