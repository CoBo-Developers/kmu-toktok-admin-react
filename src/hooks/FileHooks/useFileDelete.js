import { useFileStore } from '../../store/useFileStore';
import { fileDelete } from '../../api/fileApi';
import { useCookies } from 'react-cookie';

const useFileDelete = () => {
    const [cookies] = useCookies(['accessToken']);
    const { selectedFiles, clearSelectedFiles, triggerFileUpdate } = useFileStore((state) => ({
        selectedFiles: state.selectedFiles,
        clearSelectedFiles: state.clearSelectedFiles,
        triggerFileUpdate: state.triggerFileUpdate
    }));

    const handleDeleteFiles = () => {
        if (selectedFiles.length === 0) {
            alert('삭제할 파일을 선택해주세요.');
            return;
        }

        const fileIds = selectedFiles.map(file => file.id);
        fileDelete(cookies.accessToken, fileIds)
            .then(() => {
                alert('파일이 삭제되었습니다.');
                clearSelectedFiles();
                triggerFileUpdate();
            })
            .catch((error) => {
                alert(`파일 삭제 실패: ${error.message}`);
            });
    };

    return {
        handleDeleteFiles,
    };
};

export default useFileDelete;