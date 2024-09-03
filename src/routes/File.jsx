import './File.css';
import downloadIcon from '../assets/icons/download-icon.png';
import fileSelectedIcon from '../assets/icons/file-selected.png';
import fileUnselectedIcon from '../assets/icons/file-unselected.png';
import { fileFormattedDate } from '../utils/dateAndTime';
import useFileSelection from '../hooks/FileHooks/useFileSelection';
import useCategorySelection from '../hooks/FileHooks/useCategorySelection';
import useFileDownload from '../hooks/FileHooks/useFileDownload';
import LoadingModal from '../components/LoadingModal/LoadingModal';

function File() {
    const {
        fileData,
        getCategoryColor,
        categorySelectLoading
    } = useCategorySelection();

    const {
        selectedRows,
        handleSelectItem,
        handleSelectAll,
        isSelected,
    } = useFileSelection(fileData);

    const {
        downloadFile,
        fileDownloadLoading,
    } = useFileDownload();
    
    return (
        <main className="file-main">
            <LoadingModal show={categorySelectLoading} />
            <LoadingModal show={fileDownloadLoading} />
            <section className="file-main-inner">
                <table className="file-table">
                    <thead>
                        <tr>
                            <th>
                                <img 
                                    className='check-icon'
                                    src={selectedRows.length === fileData.length ? fileSelectedIcon : fileUnselectedIcon} 
                                    onClick={handleSelectAll} 
                                    alt="select-all"
                                />
                            </th>
                            <th className="info-column">
                                <div className="category-col">카테고리</div>
                                <div className="title-col">제목</div>
                                <div className="date-col">게시일</div>
                            </th>
                            <th>다운로드</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <img 
                                        className='check-icon'
                                        src={isSelected(item.id) ? fileSelectedIcon : fileUnselectedIcon} 
                                        onClick={() => handleSelectItem(item.id)} 
                                        alt={`select-${item.id}`}
                                    />
                                </td>
                                <td className="info-column">
                                    <div className="category-col">
                                        <span className='category' style={{ backgroundColor: getCategoryColor(item.categoryId) }}>
                                        {fileData.find(file => file.id === item.id).categoryName}
                                        </span>
                                    </div>
                                    <div className="title-col">{item.name}</div>
                                    <div className="date-col">{fileFormattedDate(item.createdAt)}</div>
                                </td>
                                <td className="download-column">
                                    <img src={downloadIcon} className='download-btn' alt="" onClick={() => downloadFile(item.id, item.fileName)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default File;
