import { useState } from "react";
import "./File.css";
import mobileDownArrow from "../../assets/icons/mobile-down-arrow.svg";
import mobileUpArrow from "../../assets/icons/mobile-up-arrow.svg";
import fileSelectedIcon from "../../assets/icons/file-selected.svg";
import fileUnselectedIcon from "../../assets/icons/file-unselected.svg";
import useFileSelection from "./hooks/useFileSelection";
import useCategorySelection from "./hooks/useCategorySelection";
import useFileDownload from "./hooks/useFileDownload";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import FileMenu from "../../components/Aside/FileMenu/FileMenu";
import useIsMobile from "../../hooks/useIsMobile";
import FileItem from "./components/FileItem";

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
    isSelected
  } = useFileSelection(fileData);

  const { 
    downloadFile, 
    fileDownloadLoading 
  } = useFileDownload();

  const [isShowExtendFileMenu, setIsShowExtendFileMenu] = useState(false);
  const isMobile = useIsMobile();

  return (
    <main className="file-main">
      <LoadingModal show={categorySelectLoading} />
      <LoadingModal show={fileDownloadLoading} />
      {isMobile && (
        <section className="extend-file-menu">
          <article
            className="extend-file-header"
            onClick={() => setIsShowExtendFileMenu(!isShowExtendFileMenu)}
          >
            <h2>파일 관리</h2>
            <img
              src={isShowExtendFileMenu ? mobileUpArrow : mobileDownArrow}
              alt=""
            />
          </article>
          <article className="extend-file-menu-content">
            {isShowExtendFileMenu && <FileMenu />}
          </article>
        </section>
      )}
      <section className="file-main-inner">
        <table className="file-table">
          <thead>
            <tr>
              <th>
                <img
                  className="check-icon"
                  src={
                    selectedRows.length === fileData.length
                      ? fileSelectedIcon
                      : fileUnselectedIcon
                  }
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
              <FileItem
                key={index}
                item={item}
                isSelected={isSelected}
                handleSelectItem={handleSelectItem}
                downloadFile={downloadFile}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default File;
