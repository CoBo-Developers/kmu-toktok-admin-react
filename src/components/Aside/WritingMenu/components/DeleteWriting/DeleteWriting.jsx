/* eslint-disable react/prop-types */
import "./DeleteWriting.css";
import useDeleteWriting from "../../hooks/useDeleteWriting";

const DeteleWriting = ({ item, setIsDeleteVisible }) => {
  const { handleDelete } = useDeleteWriting();
  return (
    <div className="delete-writing-wrapper">
      <p>과제를 삭제할까요?</p>
      <div className="delete-writing-btn-wrapper">
        <button 
          onClick={(e) =>{
            e.stopPropagation();
            setIsDeleteVisible(null)
          }}
        >
          취소
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.id);
            setIsDeleteVisible(null);
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default DeteleWriting;
