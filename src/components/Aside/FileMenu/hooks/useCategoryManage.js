import { useState, useRef, useEffect } from 'react';
import { addCategory, modifyCategory, deleteCategory } from '../../../../api/categoryApi';
import { getCategoryList } from '../../../../api/fileApi';
import { useCookies } from 'react-cookie';

const useCategoryManage = () => {
    const [cookies] = useCookies(['accessToken']);
    const [categoryList, setCategoryList] = useState([]);
    const [updateCategoryList, setUpdateCategoryList] = useState(false); //변경 후 카테고리 리스트 업데이트

    const [showCategoryManageWrapper, setShowCategoryManageWrapper] = useState(false);

    const [editCategoryId, setEditCategoryId] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState(''); // 수정할 카테고리 이름
    const newCategoryNameRef = useRef(null);

    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategory, setNewCategory] = useState(''); // 새로 추가할 카테고리 이름
    const newCategoryRef = useRef(null);

    const [categoryLoading, setCategoryLoading] = useState(false);

    useEffect(() => {
        setCategoryLoading(true);
        getCategoryList(cookies.accessToken)
            .then((response) => {
                setCategoryList(response.data.categories);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setCategoryLoading(false);
            });
    }, [cookies.accessToken, updateCategoryList]);

    useEffect(() => {
        if (newCategoryNameRef?.current) {
            newCategoryNameRef.current.style.height = 'auto';
            newCategoryNameRef.current.style.height = `${newCategoryNameRef.current.scrollHeight}px`;
            newCategoryNameRef.current.focus();
            const nameLength = newCategoryNameRef.current.value.length;
            newCategoryNameRef.current.setSelectionRange(nameLength, nameLength);
        }
    }, [newCategoryName]);

    useEffect(() => {
        if (isNewCategory && newCategoryRef?.current) {
            newCategoryRef.current.style.height = 'auto';
            newCategoryRef.current.style.height = `${newCategoryRef.current.scrollHeight}px`;
            newCategoryRef.current.focus();
        }
    }, [isNewCategory, newCategory]);

    const handleEditClick = (categoryId, currentName) => {
        setEditCategoryId(categoryId);
        setNewCategoryName(currentName);
    };

    const handleSaveClick = (categoryId) => {
        setCategoryLoading(true);
        modifyCategory(cookies.accessToken, categoryId, newCategoryName)
            .then(() => {
                alert('카테고리 이름이 변경되었습니다.');
                setEditCategoryId(null);
                setNewCategoryName('');
                setUpdateCategoryList(!updateCategoryList);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setCategoryLoading(false);
            });
    };

    const handleDeleteClick = async (categoryId) => {
        setCategoryLoading(true);
        deleteCategory(cookies.accessToken, categoryId)
            .then(() => {
                alert('카테고리가 삭제되었습니다.');
                setUpdateCategoryList(!updateCategoryList);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setCategoryLoading(false);
            });
    };

    const handleAddCategory = async () => {
        if (isNewCategory) {
            setCategoryLoading(true);
            addCategory(cookies.accessToken, newCategory)
                .then(() => {
                    alert('새로운 카테고리가 추가되었습니다.');
                    setNewCategory('');
                    setUpdateCategoryList(!updateCategoryList);
                    setIsNewCategory(false);
                })
                .catch((error) => {
                    alert(error.message);
                })
                .finally(() => {
                    setCategoryLoading(false);
                });
        } else {
            setIsNewCategory(true);
            if (newCategoryRef.current) {
                newCategoryRef.current.focus();
            }
        }
    };

    return {
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
        categoryLoading,
    };
};

export default useCategoryManage;
