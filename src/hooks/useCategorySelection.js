import { useState, useEffect } from 'react';
import { useSelectedCategoryIdStore, useCategoryStore } from '../store/useFileStore';
import { getCategoryList, getFileList } from '../api/fileApi';
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

    useEffect(() => {
        getCategoryList(cookies.accessToken)
            .then((response) => {
                const categories = response.data.categories;
                categories.forEach((category) => {
                    setCategoryList(category.id, category.name);
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [cookies.accessToken, setCategoryList]);

    useEffect(() => {
        categoryList.forEach((category) => {
            getFileList(cookies.accessToken, category.id)
                .then((response) => {
                    const filesWithCategoryId = response.data.files.map(file => ({
                        ...file,
                        categoryId: category.id,
                        categoryName: category.name,
                    }));
                    setAllFileData((prevData) => [...prevData, ...filesWithCategoryId]);
                })
                .catch((error) => {
                    alert(error.message);
                });
        });
    }, [cookies.accessToken, categoryList]);


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
    };
};

export default useCategorySelection;