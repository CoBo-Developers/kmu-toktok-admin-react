import { useEffect, useRef, useState } from "react";
import { handleTextareaChange } from "../../../utils/textareaHandler";

function useTesting() {
  const constraintsRef = useRef();
  const writingRef = useRef();
  const [constraintsContent, setConstraintsContent] = useState("");
  const [writingContent, setWritingContent] = useState("");
  const [feedbackContent, setFeedbackContent] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (constraintsRef.current) {
      handleTextareaChange({ currentTarget: constraintsRef.current });
    }
  }, [constraintsContent]);

  useEffect(() => {
    if (writingRef.current) {
      handleTextareaChange({ currentTarget: writingRef.current });
    }
  }, [writingContent]);

  const handleConstraintsChange = (e) => {
    setConstraintsContent(e.target.value);
  };

  const handleWritingChange = (e) => {
    setWritingContent(e.target.value);
  };

  const getFeedback = () => {
    setFeedbackContent([]);
    if (!writingContent ){
      alert("글을 입력해주세요.");
      return;
    }
    if (!constraintsContent){
      alert("규정을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    const userContent = encodeURIComponent(writingContent);
    const systemContent = encodeURIComponent(constraintsContent);

    const eventSource = new EventSource(`${import.meta.env.VITE_APP_PROMPTING_API_URL}/api/api/sse?userContent=${userContent}&systemContent=${systemContent}`, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      setIsLoading(false);
    }

    eventSource.addEventListener('chat-update', (event) => {
      const content = JSON.parse(event.data).message
      setFeedbackContent((prevFeedbackContent) => [...prevFeedbackContent, content]);
    })

    eventSource.onerror = () => {
      setIsLoading(false);
      eventSource.close();
    };
  };

  
  return { 
    constraintsRef, 
    writingRef,
    writingContent,
    handleWritingChange,
    constraintsContent,
    handleConstraintsChange,
    feedbackContent,
    getFeedback,
    isLoading
  };
}

export default useTesting;
