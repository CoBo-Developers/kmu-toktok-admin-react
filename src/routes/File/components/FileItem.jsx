/* eslint-disable react/prop-types */
import downloadIcon from "../../../assets/icons/download-icon.png";
import fileSelectedIcon from "../../../assets/icons/file-selected.png";
import fileUnselectedIcon from "../../../assets/icons/file-unselected.png";
import { fileFormattedDate } from "../../../utils/dateAndTime";
import "./FileItem.css";

function FileItem({
  item,
  isSelected,
  handleSelectItem,
  downloadFile,
  getCategoryColor,
}) {
  return (
    <tr>
      <td className="order-column">
        <img
          className="check-icon"
          src={isSelected(item.id) ? fileSelectedIcon : fileUnselectedIcon}
          onClick={() => handleSelectItem(item.id)}
          alt={`select-${item.id}`}
        />
      </td>
      <td className="info-column">
        <div className="category-col">
          <span
            className="category"
            style={{ backgroundColor: getCategoryColor(item.categoryId) }}
          >
            {item.categoryName}
          </span>
        </div>
        <div className="title-col">{item.name}</div>
        <div className="date-col">{fileFormattedDate(item.createdAt)}</div>
      </td>
      <td className="download-column">
        <img
          src={downloadIcon}
          className="download-btn"
          alt=""
          onClick={() => downloadFile(item.id, item.fileName)}
        />
      </td>
    </tr>
  );
}

export default FileItem;
