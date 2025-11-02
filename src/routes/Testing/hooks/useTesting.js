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

  const parseSSE = (sseData) => {
    const lines = sseData.split("\n"); // 데이터를 줄 단위로 분리
    const parsedData = {};

    lines.forEach((line) => {
      if (line.trim() === "") return; // 빈 줄 건너뛰기

      const [key, value] = line.split(/:(.+)/); // 첫 번째 `:` 기준으로 나눔
      if (key && value) {
        parsedData[key.trim()] = value.trim(); // key-value 쌍 저장
      }
    });

    return parsedData;
  };

  const requestFeedback = async (userContent, systemContent) => {
    const res = await fetch(
      `${import.meta.env.VITE_APP_PROMPTING_API_URL}/api/see`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userContent, systemContent }),
      }
    );

    if (!res.ok) {
      throw new Error("요청에 실패했습니다.");
    }

    setIsLoading(false);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    // let buffer = "";

    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // 이벤트 단위로 자르기 (빈 줄 기준)
      const events = buffer.split("\n\n");
      buffer = events.pop(); // 마지막은 incomplete일 수 있음

      for (const evt of events) {
        // "data:" 부분 찾기
        const lines = evt.split("\n").filter((l) => l.startsWith("data:"));

        // 공백 포함한 원문 추출 — trim 절대 하지 말기!
        const chunk = lines.map((l) => l.slice(5)).join("\n");

        // 한 글자 단위로 이어붙이기
        setFeedbackContent((prev) => [...prev, chunk]);
      }
    }

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   // buffer += decoder.decode(value, { stream: true });
    //   const message = decoder.decode(value, { stream: true });
    //   const sseContent = parseSSE(result);
    //   if (sseContent.event !== 'chat-update') continue;

    //   // const message = JSON.parse(sseContent.data).message;
    //   setFeedbackContent((prev) => [...prev, message]);
    // }

    setIsLoading(false);
  };

  const getFeedback = () => {
    setFeedbackContent([]);
    if (!writingContent) {
      alert("글을 입력해주세요.");
      return;
    }
    if (!constraintsContent) {
      alert("규정을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    const userContent = writingContent;
    const systemContent = constraintsContent;
    try {
      requestFeedback(userContent, systemContent);
    } catch (err) {
      alert(err);
      setIsLoading(false);
    }
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
    isLoading,
  };
}

export default useTesting;
