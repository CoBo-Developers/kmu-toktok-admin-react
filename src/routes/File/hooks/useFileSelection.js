//File에서 파일 선택에 관련된 로직
import { useState } from "react";
import { useFileStore } from "../../../store/useFileStore";

const useFileSelection = (fileData) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { addSelectedFile, removeSelectedFile, clearSelectedFiles } =
    useFileStore();

  const handleSelectItem = (id) => {
    const selectedFile = fileData.find((file) => file.id === id);

    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      if (selectedFile) {
        removeSelectedFile(id);
      }
    } else {
      setSelectedRows([...selectedRows, id]);
      if (selectedFile) {
        addSelectedFile(selectedFile);
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === fileData.length) {
      setSelectedRows([]);
      clearSelectedFiles();
    } else {
      setSelectedRows(fileData.map((item) => item.id));
      clearSelectedFiles();
      fileData.forEach((file) => addSelectedFile(file));
    }
  };

  const isSelected = (id) => selectedRows.includes(id);

  return {
    selectedRows,
    handleSelectItem,
    handleSelectAll,
    isSelected,
  };
};

export default useFileSelection;
