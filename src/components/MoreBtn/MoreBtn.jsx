import './MoreBtn.css';
import addIcon from '../../assets/icons/add-icon.svg';

function MoreBtn(props) {
  const { pageSize, setPageSize, pageIncrement} = props;

  return (
    <button className="more-btn" onClick={() => { setPageSize(parseInt(pageSize) + parseInt(pageIncrement)) }}>
      <figure><img src={addIcon} alt="add-icon" /></figure>
      <span>더보기</span>
    </button>
  )
}

export default MoreBtn;