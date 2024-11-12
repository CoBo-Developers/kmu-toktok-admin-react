import { useState } from "react";
import { getWritingList, deleteWriting } from "../../../../api/writingApi";
import { useWritingListStore } from "../../../../store/useWritingListStore";
import { useCookies } from "react-cookie";

function useDeleteWriting() {
    const [writingLoading, setWritingLoading] = useState(false);
    const setWritingList = useWritingListStore((state) => state.setWritingList);
    const [cookies] = useCookies(['accessToken']);
    
    const handleDelete = (id) => {
        setWritingLoading(true);
        deleteWriting(id, cookies.accessToken)
          .then(() => {
            setWritingLoading(true);
            getWritingList(cookies.accessToken)
              .then((res) => {
                setWritingList(res.data.assignments);
              })
              .catch((err) => {
                alert(err.message);
              })
              .finally(() => {
                setWritingLoading(false);
              });
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