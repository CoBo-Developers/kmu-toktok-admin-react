import './CategoryManageWrapper.css';
import deleteCategoryIcon from '../../../../../assets/icons/delete-category-icon.svg';
import addFileIcon from '../../../../../assets/icons/add-file-icon.svg';
import useCategoryManage from '../../hooks/useCategoryManage';

const CategoryManageWrapper = () => {
    const {
        editCategoryId,
        newCategoryName,
        setNewCategoryName,
        newCategoryNameRef,
        isNewCategory,
        newCategory,
        setNewCategory,
        newCategoryRef,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        handleAddCategory,
        categoryList,
    } = useCategoryManage();

    return (
        <section>
            <table className="category-manage-option-table">
                <tbody>
                    {categoryList.map((category) => (
                        <tr key={category.id}>
                            <td>
                                {editCategoryId === category.id ? (
                                    <textarea
                                        name="new-categoryName-input"
                                        id="new-categoryName-input"
                                        rows={1}
                                        ref={newCategoryNameRef}
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') e.preventDefault();
                                        }}
                                    />
                                ) : (
                                    <div className='category-manage-name'>{category.name}</div>
                                )}
                            </td>
                            <td>
                                <button
                                    className={`category-modify-btn ${editCategoryId === category.id ? 'change' : ''}`}
                                    onClick={() =>
                                        editCategoryId === category.id
                                            ? handleSaveClick(category.id)
                                            : handleEditClick(category.id, category.name)
                                    }
                                >
                                    {editCategoryId === category.id ? '저장' : '이름 변경'}
                                </button>
                            </td>
                            <td>
                                <button className='category-delete-btn' onClick={() => handleDeleteClick(category.id)}>
                                    <img src={deleteCategoryIcon} alt="delete-category" />
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isNewCategory && (
                <textarea
                    name="new-category-input"
                    id="new-category-input"
                    rows={1}
                    ref={newCategoryRef}
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}
                />
            )}
            <div className="add-category-wrapper" onClick={handleAddCategory}>
                <img src={addFileIcon} alt="add-category" />
                <span>{!isNewCategory ? '카테고리 추가' : '완료'}</span>
            </div>
        </section>
    );
};

export default CategoryManageWrapper;
