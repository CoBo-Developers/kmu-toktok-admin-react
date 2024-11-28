import { useEffect, useRef, useState } from "react";
import { handleTextareaChange } from "../../../utils/textareaHandler";

function useTesting() {
  const constraintsRef = useRef();
  const writingRef = useRef();
  const [constraintsContent, setConstraintsContent] = useState("");
  const [writingContent, setWritingContent] = useState("");
  const [feedbackContent, setFeedbackContent] = useState(""); 

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
    // api
    setFeedbackContent("피드백 내용");
  }

  return { 
    constraintsRef, 
    writingRef,
    writingContent,
    handleWritingChange,
    constraintsContent,
    handleConstraintsChange,
    feedbackContent,
    getFeedback,
  };
}

export default useTesting;
