import { useEffect } from 'react';
import CreateNewWriting from './CreateNewWriting';
import './WritingMenu.css';
import useWritingList from '../../../hooks/useWritingList';

function WritingMenu() {
  const { writingList } = useWritingList();

  useEffect(() => {
    console.log(writingList);
  }, [writingList]);

  return (
    <section className="aside-writing">
      <h2>주차별 글쓰기</h2>
      <ul className="aside-writing-items">
        {
          writingList.map((item, i) => {
            return (
              <li key={i}>
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