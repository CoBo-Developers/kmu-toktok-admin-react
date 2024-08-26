import './MoreBtn.css';
import addIcon from '../../assets/icons/add-icon.svg';

function MoreBtn(props) {
  const { pageSize, setPageSize } = props;

  return (
    <button className="more-btn" onClick={() => { setPageSize(pageSize + 10) }}>
      <figure><img src={addIcon} alt="add-icon" /></figure>
      <span>더보기</span>
    </button>
  )
}

export default MoreBtn;