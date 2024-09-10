import './MoreBtn.css';
import addIcon from '../../assets/icons/add-icon.svg';

function MoreBtn(props) {
  const { pageSize, setPageSize } = props;
  const pageIncrement = parseInt(import.meta.env.VITE_MANAGE_PAGESIZE);

  return (
    <button className="more-btn" onClick={() => { setPageSize(parseInt(pageSize) + pageIncrement) }}>
      <figure><img src={addIcon} alt="add-icon" /></figure>
      <span>더보기</span>
    </button>
  )
}

export default MoreBtn;