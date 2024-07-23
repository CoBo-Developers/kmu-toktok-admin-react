import { useEffect, useState } from "react";
import useCurrentPath from "./useCurrentPath";
import useSeletectUserStore from "../store/useSeletedUserStore";

function useShowExtend() {
  const currentPath = useCurrentPath();
  const selectedUser = useSeletectUserStore((state) => state.seletedUser);
  const [showExtend, setShowExtend] = useState(false);

  useEffect(() => {
    if (
      currentPath === 'chatstu' || 
      currentPath === 'file' || 
      (currentPath === 'manage' && selectedUser.selected)
    ) {
      setShowExtend(true);
    } else {
      setShowExtend(false);
    }
  }, [currentPath, selectedUser])

  return { showExtend };
}

export default useShowExtend;