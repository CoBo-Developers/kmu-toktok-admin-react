// FileMenu에서 파일 수정에 관련된 로직
import { useState, useEffect, useRef } from 'react';
import { fileModify } from '../../api/fileApi';
import { useFileStore } from '../../store/useFileStore';
import { useCookies } from 'react-cookie';

const useFileModify = () => {
    const [cookies] = useCookies(['accessToken']);
    const { selectedFiles, triggerFileUpdate } = useFileStore();
    const [showModifyFileNameWrapper, setShowModifyFileNameWrapper] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [modifyActiveCategoryId, setModifyActiveCategoryId] = useState(null);
    const newFileNameRef = useRef();

    const handleModifyWrapperClick = () => {
        if (showModifyFileNameWrapper) {
            setShowModifyFileNameWrapper(false);
            setModifyActiveCategoryId(null);
            return;
        }
        if (selectedFiles.length === 1) {
            const selectedFile = selectedFiles[0];
            setNewFileName(selectedFile.name);
            setModifyActiveCategoryId(selectedFile.categoryId); 
            setShowModifyFileNameWrapper(true);
        } else {
            alert('파일 하나만 선택해주세요.');
            setModifyActiveCategoryId(null);
        }
    };

    useEffect(() => {
        if (selectedFiles.length > 1 && showModifyFileNameWrapper) {
            alert('파일 하나만 선택해주세요.');
            setShowModifyFileNameWrapper(false);
        }
    }, [selectedFiles, showModifyFileNameWrapper]);


    useEffect(() => {
        if (newFileNameRef?.current) {
            newFileNameRef.current.style.height = 'auto';
            newFileNameRef.current.style.height = newFileNameRef.current.scrollHeight + 'px';
        }
    }, [newFileName]);


    const handleCategorySelect = (categoryId) => {
        setModifyActiveCategoryId(categoryId);
    };

    const handleFileModify = () => {
        if (selectedFiles.length === 1) {
            const selectedFile = selectedFiles[0];
            fileModify(cookies.accessToken, selectedFile.id, newFileName, modifyActiveCategoryId)
                .then(() => {
                    alert('파일이 수정되었습니다');
                    setShowModifyFileNameWrapper(false);
                    triggerFileUpdate(); // 파일 수정 후 re-rendering
                })
                .catch((error) => {
                    alert(`파일 수정 실패: ${error.message}`);
                });
                newFileNameRef?.current.blur();
        }
        else{
            alert('파일 하나만 선택해주세요.');
            setShowModifyFileNameWrapper(false);
        }
    }

    return {
        showModifyFileNameWrapper,
        handleModifyWrapperClick,
        handleFileModify,
        newFileName,
        newFileNameRef,
        setNewFileName,
        modifyActiveCategoryId,
        handleCategorySelect
    };
};

export default useFileModify;