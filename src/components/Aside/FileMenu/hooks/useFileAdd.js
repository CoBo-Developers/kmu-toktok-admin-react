import { useState, useRef, useEffect } from 'react';
import { fileAdd } from '../../../../api/fileApi';
import { useFileStore } from '../../../../store/useFileStore';
import { useCookies } from 'react-cookie';

const useFileAdd = () => {
    const [cookies] = useCookies(['accessToken']);
    const { triggerFileUpdate } = useFileStore();
    const [showAddFileWrapper, setShowAddFileWrapper] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [file, setFile] = useState(null);
    const newFileNameRef = useRef();
    const fileInputRef = useRef(); 
    const [fileAddLoading, setFileAddLoading] = useState(false);

    useEffect(() => {
        if (!showAddFileWrapper) {
            setFile(null); 
            setNewFileName('');
            setSelectedCategoryId(null); 

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [showAddFileWrapper]);

    const handleAddWrapperClick = () => {
        setShowAddFileWrapper(!showAddFileWrapper);

        if (!showAddFileWrapper && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setNewFileName(selectedFile.name);
            setFile(selectedFile); 
        }
    };

    const handleFileAdd = () => {
        if (!file || !selectedCategoryId) {
            alert('카테고리를 선택해주세요.');
            return;
        }

        if (!newFileName) {
            alert('제목을 입력해주세요.');
            return;
        }
        setFileAddLoading(true);
        fileAdd(cookies.accessToken, newFileName, selectedCategoryId, file)
            .then(() => {
                alert('파일이 추가되었습니다');
                setShowAddFileWrapper(false);
                triggerFileUpdate();
            })
            .catch((error) => {
                alert(`파일 추가 실패: ${error.message}`);
            })
            .finally(() => {
                setFileAddLoading(false);
            });
        newFileNameRef?.current.blur();
    };

    return {
        showAddFileWrapper,
        handleAddWrapperClick,
        handleFileAdd,
        newFileName,
        newFileNameRef,
        setNewFileName,
        selectedCategoryId,
        handleCategorySelect,
        handleFileChange,
        fileInputRef,
        fileAddLoading,
    };
};

export default useFileAdd;
