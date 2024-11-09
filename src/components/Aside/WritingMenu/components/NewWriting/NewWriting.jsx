/* eslint-disable react/prop-types */
import useCreateWriting from "../../hooks/useCreateWriting";
import useModifyWriting from "../../hooks/useModifyWriting";
import "./NewWriting.css";
import LoadingModal from "../../../../LoadingModal/LoadingModal";
import useWritingForm from "../../hooks/useWritingForm";
import useAssignmentStore from "../../../../../store/useAssignmentStore";

function NewWriting({ initialData, onClose }) {
  const { assignmentData } = useAssignmentStore();
  const {
    handleTitleChange,
    handleDescriptionChange,
    handleConstraintsChange,
    handleScoreChange,
    handleStartYearChange,
    handleStartMonthChange,
    handleStartDayChange,
    handleEndYearChange,
    handleEndMonthChange,
    handleEndDayChange,
    checkInfo
  } = useWritingForm(initialData);

  const {
    handleCreateButtonClick,
    isCreateLoading
  } = useCreateWriting();

  const  {
    handleModifyButtonClick,
    isModifyLoading
  } = useModifyWriting();

  return (
    <section className="create-new-wrting">
      <LoadingModal show={isCreateLoading} />
      <LoadingModal show={isModifyLoading} />
      <article className="input">
        <label htmlFor="title">제목</label>
        <textarea
          name="title"
          id="title"
          placeholder="제목"
          rows={1}
          value={assignmentData.title || ""}
          onChange={handleTitleChange}
        ></textarea>
      </article>
      <article className="textarea">
        <label htmlFor="description">설명</label>
        <textarea
          name="description"
          id="description"
          placeholder="설명"
          rows={1}
          value={assignmentData.description || ""}
          onChange={handleDescriptionChange}
        ></textarea>
      </article>
      <article className="textarea">
        <label htmlFor="constraints">규정</label>
        <textarea
          name="constraints"
          id="constraints"
          placeholder="규정"
          rows={1}
          value={assignmentData.constraints || ""}
          onChange={handleConstraintsChange}
        ></textarea>
      </article>
      <article className="input">
        <label htmlFor="score">총점</label>
        <input
          type="number"
          name="score"
          id="score"
          onChange={handleScoreChange}
          min={0}
          value={assignmentData.score || ""}
        />
      </article>
      <article className="due-date-wrapper">
        <h5 htmlFor="due-date">기한</h5>
        <section className="start-date-wrapper">
          <label htmlFor="start-date">시작일</label>
          <div>
            <span>
              <input
                type="number"
                maxLength={4}
                onChange={handleStartYearChange}
                value={assignmentData.startDate.year || ""}
              />
              년
            </span>
          </div>
          <div>
            <span>
              <input
                type="number"
                maxLength={2}
                onChange={handleStartMonthChange}
                value={assignmentData.startDate.month || ""}
              />
              월
            </span>
            <span>
              <input
                type="number"
                maxLength={2}
                onChange={handleStartDayChange}
                value={assignmentData.startDate.day || ""}
              />
              일
            </span>
          </div>
        </section>
        <section className="end-date-wrapper">
          <label htmlFor="end-date">마감일</label>
          <div>
            <span>
              <input
                type="number"
                maxLength={4}
                onChange={handleEndYearChange}
                value={assignmentData.endDate.year || ""}
              />
              년
            </span>
          </div>
          <div>
            <span>
              <input
                type="number"
                maxLength={2}
                onChange={handleEndMonthChange}
                value={assignmentData.endDate.month || ""}
              />
              월
            </span>
            <span>
              <input
                type="number"
                maxLength={2}
                onChange={handleEndDayChange}
                value={assignmentData.endDate.day || ""}
              />
              일
            </span>
          </div>
        </section>
      </article>
      <button
        onClick={() => {
          if(checkInfo()){
            initialData ? handleModifyButtonClick() : handleCreateButtonClick();
            onClose();
          }
        }}
      >
        {initialData ? "수정 완료" : "확인"}
      </button>
    </section>
  );
}

export default NewWriting;
