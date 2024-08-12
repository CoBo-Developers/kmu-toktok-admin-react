import CreateNewWriting from './CreateNewWriting';
import './WritingMenu.css';

function WritingMenu() {
  return (
    <section className="aside-writing">
      <h2>주차별 글쓰기</h2>
      <ul className="aside-writing-items">
        <li>
          1주차 글쓰기
        </li>
        <li className="active">
          2주차 글쓰기
        </li>
        <li>
          3주차 글쓰기
        </li>
        <li>
          4주차 글쓰기
        </li>
        <li>
          5주차 글쓰기
        </li>
      </ul>
      <CreateNewWriting />
    </section>
  )
}

export default WritingMenu;