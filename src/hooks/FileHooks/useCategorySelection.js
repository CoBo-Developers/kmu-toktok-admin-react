// FileMenu에서 카테고리 선택에 관련된 로직
import { useState, useEffect } from 'react';
import { useSelectedCategoryIdStore, useCategoryStore, useFileStore } from '../../store/useFileStore';
import { getCategoryList, getFileList } from '../../api/fileApi';
import { useCookies } from 'react-cookie';

const useCategorySelection = () => {
    const [cookies] = useCookies(['accessToken']);
    const [fileData, setFileData] = useState([]);
    const [allFileData, setAllFileData] = useState([]);
    const selectedCategoryId = useSelectedCategoryIdStore((state) => state.selectedCategoryId);

    const { categoryList, setCategoryList } = useCategoryStore((state) => ({
        categoryList: state.categoryList,
        setCategoryList: state.setCategoryList
    }));

    const { fileUpdateTrigger } = useFileStore();
    const [categorySelectLoading, setCategorySelectLoading] = useState(false);

    useEffect(() => {
            setCategorySelectLoading(true);
            getCategoryList(cookies.accessToken)
                .then((response) => {
                    const categories = response.data.categories;
                    categories.forEach((category) => {
                        setCategoryList(category.id, category.name);
                    });
                })
                .catch((error) => {
                    alert(error.message);
                })
                .finally(() => {
                    setCategorySelectLoading(false);
                });
    }, [cookies.accessToken]);

    useEffect(() => {
        setAllFileData([]);
        categoryList.forEach((category) => {
            setCategorySelectLoading(true);
            getFileList(cookies.accessToken, category.id)
                .then((response) => {
                    const filesWithCategoryId = response.data.files.map(file => ({
                        ...file,
                        categoryId: category.id,
                        categoryName: category.name,
                    }));
                    setAllFileData((prevData) => {
                        const existingIds = new Set(prevData.map(file => file.id));
                        const newFiles = filesWithCategoryId.filter(file => !existingIds.has(file.id));
                        return [...prevData, ...newFiles];
                    });
                })
                .catch((error) => {
                    alert(error.message);
                })
                .finally(() => {
                    setCategorySelectLoading(false);
                });
        });
    }, [cookies.accessToken, categoryList, fileUpdateTrigger]);


    useEffect(() => {
        if (selectedCategoryId === 0 || selectedCategoryId === null) {
            setFileData(allFileData);
        } else {
            const filteredFiles = allFileData.filter(file => file.categoryId === selectedCategoryId);
            setFileData(filteredFiles);
        }
    }, [selectedCategoryId, allFileData]);

    
    const getCategoryColor = (categoryId) => {
        const category = categoryList.find(cat => cat.id === categoryId);
        return category ? category.color : 'transparent';
    };

    return {
        fileData,
        categoryList,
        getCategoryColor,
        categorySelectLoading
    };
};

export default useCategorySelection;