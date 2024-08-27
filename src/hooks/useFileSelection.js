import { useState } from 'react';

const useFileSelection = (fileData) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectItem = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === fileData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(fileData.map(item => item.id));
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