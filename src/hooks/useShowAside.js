import { useEffect, useState } from "react";
import useCurrentPath from "./useCurrentPath";

export default function useShowAside() {
  const currentPath = useCurrentPath();
  const [showAside, setShowAside] = useState(false);

  useEffect(() => {
    if (
      currentPath == 'chatbot' ||
      currentPath == 'chatstu' ||
      currentPath == 'file' ||
      currentPath == 'writing' ||
      currentPath == 'manage'
    ) {
      setShowAside(true);
    } else {
      setShowAside(false);
    }
  }, [currentPath])

  return showAside;
}