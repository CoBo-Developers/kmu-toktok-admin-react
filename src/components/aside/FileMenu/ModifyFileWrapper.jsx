/* eslint-disable react/prop-types */
import './ModifyFileWrapper.css';

const ModifyFileWrapper = ({
    categories,
    newFileName,
    newFileNameRef,
    setNewFileName,
    modifyActiveCategoryId,
    handleCategorySelect,
    handleFileModify
}) => {

    return (
        <section className='modify-wrapper-extend'>
            <article className='new-file-name-wrapper'>
                <h3>제목</h3>
                <textarea
                    rows={1}
                    ref={newFileNameRef}
                    name="new-fileName-input"
                    id="new-fileName-input"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                />
            </article>
            <article className='category-modify-list-wrapper'>
                <h3>카테고리</h3>
                <ul className="category-modify-option-list">
                    {categories.filter(category => category.id !== 0).map((category) => (
                        <li
                            key={category.id}
                            className={`category-modify-option-item ${modifyActiveCategoryId === category.id ? 'active' : ''}`}
                            onClick={() => handleCategorySelect(category.id)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </article>
            <button 
                className='modify-file-confirm-btn' 
                onClick={handleFileModify}
            >
                완료
            </button>
        </section>
    );
};

export default ModifyFileWrapper;
