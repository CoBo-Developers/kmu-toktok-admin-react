import { useEffect, useState } from 'react';
import './WritingMenu.css';
import useWritingList from './hooks/useWritingList';
import { useCurrentWritingStore } from '../../../store/useCurrentWritingStore';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../../hooks/useIsMobile';
import mobileDownArrow from '../../../assets/icons/mobile-down-arrow.svg';
import mobileUpArrow from '../../../assets/icons/mobile-up-arrow.svg';
import writingDelete from '../../../assets/icons/delete-category-icon.svg';
import extendIcon from '../../../assets/icons/extend-icon.svg';
import reduceIcon from '../../../assets/icons/reduce-icon.svg';
import LoadingModal from '../../LoadingModal/LoadingModal';
import DeteleWriting from './components/DeleteWriting/DeleteWriting';
import NewWriting from './components/NewWriting/NewWriting';

function WritingMenu() {
  const { writingList, writingLoading} = useWritingList();
  const { currentWritingId, setCurrentWritingId } = useCurrentWritingStore();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const selectedWriting = writingList.find(item => item.id === currentWritingId);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isDeleteVisible, setIsDeleteVisible] = useState(null);
  const [isModifyVisible, setIsModifyVisible] = useState(null);
  const [onCreate, setOnCreate] = useState(false);

  let writingHeader = '';
  if (isMobile) {
    writingHeader = selectedWriting ? selectedWriting.title : '목록보기';
  }
  else {
    writingHeader = '주차별 학습활동';
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
                    <>
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
                          if (isDeleteVisible) {
                            setIsDeleteVisible(null);
                          }
                          if (isModifyVisible) {
                            setIsModifyVisible(null);
                          }
                          setCurrentWritingId(item.id);
                          handleDropdown();
                          navigate('/writing/' + item.id);
                        }}
                      >
                        <div className={
                          `writing-title-wrapper ${isDeleteVisible === item.id ? 'delete-visible' : ''}`}
                        >
                          {item.title}
                          {currentWritingId === item.id ? (
                            isModifyVisible === item.id ? (
                              <img src={reduceIcon} 
                                alt="delete" 
                                className='delete-writing'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsModifyVisible(null);
                                }} 
                              />
                              ) : (
                              <img src={extendIcon} 
                                alt="extend" 
                                className='delete-writing'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsModifyVisible(item.id);
                                  setOnCreate(false);
                                }}
                              />
                            )
                          ): (
                            <img src={writingDelete} 
                              alt="delete" 
                              className='delete-writing'
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsDeleteVisible(item.id);
                              }} 
                            />
                          )}
                        </div>
                        {isDeleteVisible === item.id && (
                          <DeteleWriting item={item} setIsDeleteVisible={setIsDeleteVisible}/>
                        )}
                      </li>
                      {isModifyVisible === item.id && (
                        <NewWriting initialData={item} onClose={()=> setIsModifyVisible(null)}/>
                      )}
                    </>
                  )
                })
              }
            </ul>
            {onCreate ? (
              <NewWriting initialData={null} onClose={()=> setOnCreate(false)}/>
            ):
            <button
              className="aside-writing-create-btn" 
              onClick={() => { 
                setOnCreate(true);
                setIsModifyVisible(null);
              }}
            >
              + 새로운 글쓰기 추가
            </button>
            }
        </article>
      )}
    </section>
  )
}

export default WritingMenu;