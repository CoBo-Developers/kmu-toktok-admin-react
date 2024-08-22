import CreateNewWriting from './CreateNewWriting';
import './WritingMenu.css';
import useWritingList from '../../../hooks/useWritingList';
import { useCurrentWritingStore } from '../../../store/useCurrentWritingStore';
import { useNavigate } from 'react-router-dom';

function WritingMenu() {
  const { writingList } = useWritingList();
  const { currentWritingId, setCurrentWritingId } = useCurrentWritingStore();
  const navigate = useNavigate();

  return (
    <section className="aside-writing">
      <h2>주차별 글쓰기</h2>
      <ul className="aside-writing-items">
        {
          writingList.map((item, i) => {
            return (
              <li className={currentWritingId === item.id ? 'active' : null} key={i} onClick={() => {
                setCurrentWritingId(item.id);
                navigate('/writing/' + item.id)
              }}>
                {item.title}
              </li>
            )
          })
        }
      </ul>
      <CreateNewWriting />
    </section>
  )
}

export default WritingMenu;