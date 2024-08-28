import { useState, useEffect } from 'react';
import './FileMenu.css';
import categoryCheckIcon from '../../../assets/icons/category-check-icon.png';
import addFileIcon from '../../../assets/icons/add-file-icon.png';
import deleteFileIcon from '../../../assets/icons/delete-file-icon.png';
import modifyFileIcon from '../../../assets/icons/modify-file-icon.png';
import categoryManageIcon from '../../../assets/icons/category-manage-icon.png';
import deleteCategoryIcon from '../../../assets/icons/delete-category-icon.png';
import { getCategoryList } from '../../../api/fileApi';
import { useCookies } from 'react-cookie';
import { useSelectedCategoryIdStore } from '../../../store/useFileStore';
import  useFileModify from '../../../hooks/FileHooks/useFileModify';
import useCategoryManage from '../../../hooks/FileHooks/useCategoryManage';

const FileMenu = () => {
    const [cookies] = useCookies(['accessToken']);
    const [categories, setCategories] = useState([]);

    const { selectedCategoryIdStore, setSelectedCategoryIdStore } = useSelectedCategoryIdStore((state) => ({
        selectedCategoryIdStore: state.selectedCategoryId,
        setSelectedCategoryIdStore: state.setSelectedCategoryId
    }));

    const {
        showModifyFileNameWrapper,
        handleModifyWrapperClick,
        handleFileModify,
        newFileName,
        newFileNameRef,
        setNewFileName,
        modifyActiveCategoryId,
        handleCategorySelect,
    } = useFileModify(cookies);

    const {
        showCategoryManageWrapper,
        setShowCategoryManageWrapper,
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

    useEffect(() => {
        getCategoryList(cookies.accessToken)
            .then((response) => {
                const newCategory = { id: 0, name: "게시된 모든 파일 보기" };
                const updatedCategories = [newCategory, ...response.data.categories];
                setCategories(updatedCategories);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [cookies.accessToken]);

    return (
        <main>
            <section className="category-wrapper">
                <ul className="category-list">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={`category-item ${selectedCategoryIdStore === category.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategoryIdStore(category.id)}
                        >
                            {category.name}
                            {selectedCategoryIdStore === category.id && <img src={categoryCheckIcon} className="category-check-icon" alt="" />}
                        </li>
                    ))}
                </ul>
            </section>
            <section className='file-manage-wrapper'>
                <article className='add-file-wrapper'>
                    <img src={addFileIcon} alt="add-file" />
                    <span>파일 추가하기</span>
                </article>
                <article className='delete-file-wrapper'>
                    <img src={deleteFileIcon} alt="delete-file" />
                    <span>파일 삭제하기</span>
                </article>
                <article className={`modify-file-wrapper ${showModifyFileNameWrapper ? 'active' : ''}`} onClick={handleModifyWrapperClick}>
                    <img src={modifyFileIcon} alt="modify-file" />
                    <span>파일 수정하기</span>
                </article>
                {showModifyFileNameWrapper && (
                    <section className='modify-wrapper-extend'>
                        <article className='new-file-name-wrapper'>
                            <h3>제목</h3>
                            <textarea
                                rows={1}
                                ref={newFileNameRef}
                                name="new-fileName-input"
                                id="new-fileName-input"
                                value={newFileName}
                                onChange={(e)=>setNewFileName(e.target.value)}
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
                )}
                <article className={`category-manage-wrapper ${showCategoryManageWrapper ? 'active' : ''}`} onClick={() => setShowCategoryManageWrapper(!showCategoryManageWrapper)}>
                    <img src={categoryManageIcon} alt="category-manage" />
                    <span>카테고리 편집하기</span>
                </article>
                {showCategoryManageWrapper && (
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
                                                <div>{category.name}</div>
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
                )}
            </section>
        </main>
    );
};

export default FileMenu;