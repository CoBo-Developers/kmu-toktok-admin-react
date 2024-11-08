import { useState, useEffect } from 'react';
import './FileMenu.css';
import categoryCheckIcon from '../../../assets/icons/category-check-icon.png';
import addFileIcon from '../../../assets/icons/add-file-icon.png';
import deleteFileIcon from '../../../assets/icons/delete-file-icon.png';
import modifyFileIcon from '../../../assets/icons/modify-file-icon.png';
import categoryManageIcon from '../../../assets/icons/category-manage-icon.png';
import { getCategoryList } from '../../../api/fileApi';
import { useCookies } from 'react-cookie';
import { useSelectedCategoryIdStore } from '../../../store/useFileStore';
import useFileModify from '../../../hooks/FileHooks/useFileModify';
import useFileAdd from '../../../hooks/FileHooks/useFileAdd';
import useFileDetele from '../../../hooks/FileHooks/useFileDelete';
import useCategoryManage from '../../../hooks/FileHooks/useCategoryManage';
import ModifyFileWrapper from './ModifyFileWrapper';
import CategoryManageWrapper from './CategoryManageWrapper';
import LoadingModal from '../../LoadingModal/LoadingModal';

const FileMenu = () => {
    const [cookies] = useCookies(['accessToken']);
    const [categories, setCategories] = useState([]);
    const { selectedCategoryIdStore, setSelectedCategoryIdStore } = useSelectedCategoryIdStore((state) => ({
        selectedCategoryIdStore: state.selectedCategoryId,
        setSelectedCategoryIdStore: state.setSelectedCategoryId
    }));

    const [getCategoryLoading, setGetCategoryLoading] = useState(false);
    const {
        showModifyFileNameWrapper,
        handleModifyWrapperClick,
        handleFileModify,
        newFileName: modifyFileName,
        newFileNameRef: modifyFileNameRef,
        setNewFileName: setModifyFileName,
        modifyActiveCategoryId,
        handleCategorySelect: handleModifyCategorySelect,
        fileModifyLoading
    } = useFileModify();

    const {
        showAddFileWrapper,
        handleAddWrapperClick,
        handleFileAdd,
        newFileName: addFileName,
        newFileNameRef: addFileNameRef,
        setNewFileName: setAddFileName,
        selectedCategoryId,
        handleCategorySelect: handleAddCategorySelect,
        handleFileChange,
        fileInputRef,
        fileAddLoading
    } = useFileAdd();

    const {
        handleDeleteFiles,
        fileDeleteLoading
    } = useFileDetele();

    const {
        showCategoryManageWrapper,
        setShowCategoryManageWrapper,
        categoryLoading
    } = useCategoryManage();

    useEffect(() => {
        setGetCategoryLoading(true);
        getCategoryList(cookies.accessToken)
            .then((response) => {
                const newCategory = { id: 0, name: "게시된 모든 파일 보기" };
                const updatedCategories = [newCategory, ...response.data.categories];
                setCategories(updatedCategories);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setGetCategoryLoading(false);
            });
    }, [cookies.accessToken]);

    return (
        <main>
            <LoadingModal show={getCategoryLoading} />
            <LoadingModal show={categoryLoading} />
            <LoadingModal show={fileAddLoading} />
            <LoadingModal show={fileDeleteLoading} />
            <LoadingModal show={fileModifyLoading} />
            <section className="category-wrapper">
                <ul className="category-list">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={`category-item ${selectedCategoryIdStore === category.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategoryIdStore(category.id)}
                        >
                            <img
                                src={categoryCheckIcon}
                                className="category-check-icon"
                                alt="category-check-icon"
                            />
                            <span className="category-name">{category.name}</span>
                        </li>
                    ))}
                </ul>
            </section>
            <section className='file-manage-wrapper'>
                <article 
                    className={`add-file-wrapper ${showAddFileWrapper ? 'active' : ''}`} 
                    onClick={handleAddWrapperClick}
                >
                    <img src={addFileIcon} alt="add-file" />
                    <span>파일 추가하기</span>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </article>
                {showAddFileWrapper && (
                    <ModifyFileWrapper
                        categories={categories}
                        newFileName={addFileName}
                        newFileNameRef={addFileNameRef}
                        setNewFileName={setAddFileName}
                        modifyActiveCategoryId={selectedCategoryId}
                        handleCategorySelect={handleAddCategorySelect}
                        handleFileModify={handleFileAdd}
                    />
                )}
                <article className='delete-file-wrapper' onClick={handleDeleteFiles}>
                    <img src={deleteFileIcon} alt="delete-file" />
                    <span>파일 삭제하기</span>
                </article>
                <article 
                    className={`modify-file-wrapper ${showModifyFileNameWrapper ? 'active' : ''}`} 
                    onClick={handleModifyWrapperClick}
                >
                    <img src={modifyFileIcon} alt="modify-file" />
                    <span>파일 수정하기</span>
                </article>
                {showModifyFileNameWrapper && (
                    <ModifyFileWrapper
                        categories={categories}
                        newFileName={modifyFileName}
                        newFileNameRef={modifyFileNameRef}
                        setNewFileName={setModifyFileName}
                        modifyActiveCategoryId={modifyActiveCategoryId}
                        handleCategorySelect={handleModifyCategorySelect}
                        handleFileModify={handleFileModify}
                    />
                )}
                <article 
                    className={`category-manage-wrapper ${showCategoryManageWrapper ? 'active' : ''}`} 
                    onClick={() => setShowCategoryManageWrapper(!showCategoryManageWrapper)}
                >
                    <img src={categoryManageIcon} alt="category-manage" />
                    <span>카테고리 편집하기</span>
                </article>
                {showCategoryManageWrapper && (
                    <CategoryManageWrapper categories={categories} />
                )}
            </section>
        </main>
    );
};

export default FileMenu;