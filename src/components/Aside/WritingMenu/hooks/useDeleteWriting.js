import { useState } from "react";
import { deleteWriting } from "../../../../api/writingApi";
import { useWritingListStore } from "../../../../store/useWritingListStore";
import { useCookies } from "react-cookie";

function useDeleteWriting() {
    const [writingLoading, setWritingLoading] = useState(false);
    const { writingList, setWritingList } = useWritingListStore();
    const [cookies] = useCookies(['accessToken']);
    
    const handleDelete = (id) => {
        setWritingLoading(true);
        deleteWriting(id, cookies.accessToken)
          .then(() => {
            setWritingList(writingList.filter(item => item.id !== id));
          })
          .catch((err) => {
            alert(err.message);
          })
          .finally(() => {
            setWritingLoading(false);
          });
      };
    return { handleDelete, writingLoading };
}
export default useDeleteWriting;