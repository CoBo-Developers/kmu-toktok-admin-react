//File에서 파일 다로운드 로직
import { useCallback } from 'react';
import { fileDownload } from '../../api/fileApi';
import { useCookies } from 'react-cookie';

const useFileDownload = () => {
    const [cookies] = useCookies(['accessToken']);

    const downloadFile = useCallback((fileId, fileName) => {
        return fileDownload(cookies.accessToken, fileId)
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                alert(`Download failed: ${error.message}`);
            });
    }, [cookies.accessToken]);

    return { downloadFile };
};

export default useFileDownload;
