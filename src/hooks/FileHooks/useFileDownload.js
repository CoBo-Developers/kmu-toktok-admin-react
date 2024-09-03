import { useState } from 'react';
import { fileDownload } from '../../api/fileApi';
import { useCookies } from 'react-cookie';

const useFileDownload = () => {
    const [cookies] = useCookies(['accessToken']);
    const [fileDownloadLoading, setFileDownloadLoading] = useState(false);

    const downloadFile = (fileId, fileName) => {
        setFileDownloadLoading(true);
        fileDownload(cookies.accessToken, fileId)
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
            })
            .finally(() => {
                setFileDownloadLoading(false);
            });
    };

    return { downloadFile, fileDownloadLoading };
};

export default useFileDownload;
