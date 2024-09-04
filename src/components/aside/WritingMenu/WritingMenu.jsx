import { useEffect, useState } from 'react';
import CreateNewWriting from './CreateNewWriting';
import './WritingMenu.css';
import useWritingList from '../../../hooks/useWritingList';
import { useCurrentWritingStore } from '../../../store/useCurrentWritingStore';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../../hooks/useIsMobile';
import mobileDownArrow from '../../../assets/icons/mobile-down-arrow.png';
import mobileUpArrow from '../../../assets/icons/mobile-up-arrow.png';
import writingDelete from '../../../assets/icons/delete-category-icon.png';
import LoadingModal from '../../LoadingModal/LoadingModal';

function WritingMenu() {
  const { writingList, writingLoading, handleDelete } = useWritingList();
  const { currentWritingId, setCurrentWritingId } = useCurrentWritingStore();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const selectedWriting = writingList.find(item => item.id === currentWritingId);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isDeleteVisible, setIsDeleteVisible] = useState(null);

  let writingHeader = '';
  if (isMobile) {
    writingHeader = selectedWriting ? selectedWriting.title : '목록보기';
  }
  else {
    writingHeader = '주차별 글쓰기';
  }

  const handleDropdown = () => {
    if (isMobile) {
      setIsMenuVisible(!isMenuVisible);
    }
  }

  useEffect(() => {
    if(isMobile){
      setIsMenuVisible(false);
    }
  }, [isMobile]);

  return (
    <section className="aside-writing">
      <LoadingModal show={writingLoading} />
      <div className='writing-mobile-header' onClick={handleDropdown}>
       <h2>{writingHeader}</h2> 
        {isMobile && (
          <img src={isMenuVisible ? mobileUpArrow : mobileDownArrow} alt="arrow" />
        )}
      </div>
      {isMenuVisible && (
        <article className='aside-writing-content'>
            <ul className="aside-writing-items">
              {
                writingList.map((item, i) => {
                  return (
                    <li
                      className={
                        currentWritingId === item.id
                          ? 'active'
                          : isDeleteVisible === item.id
                          ? 'delete-visible'
                          : null
                      }
                      key={i}
                      onClick={() => {
                        setCurrentWritingId(item.id);
                        handleDropdown();
                        navigate('/writing/' + item.id);
                      }}
                    >
                      <div className={
                        `writing-title-wrapper ${isDeleteVisible === item.id ? 'delete-visible' : ''}`}
                      >
                        {item.title}
                        <img src={writingDelete} 
                            alt="delete" 
                            className='delete-writing'
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsDeleteVisible(item.id);
                            }} 
                        />
                      </div>
                      {isDeleteVisible === item.id && (
                        <div className='delete-writing-wrapper'>
                          <p>과제를 삭제할까요?</p>
                          <div className='delete-writing-btn-wrapper'>
                            <button onClick={() => setIsDeleteVisible(null)}>
                              취소</button>
                            <button
                             onClick={() => {
                              handleDelete(item.id);
                              setIsDeleteVisible(null);
                            }}>삭제</button>
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })
              }
            </ul>
            <CreateNewWriting />
        </article>
      )}
    </section>
  )
}

export default WritingMenu;