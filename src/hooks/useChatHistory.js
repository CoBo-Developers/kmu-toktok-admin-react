import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { getStudentChat } from '../api/chatBotApi';

function useChatHistory() {
  const params = useParams();
  const id = params.id
  const [cookies] = useCookies(['accessToken']);
  const [chatHistory, setChatHistory] = useState([]);
  const chatListRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cookies.accessToken) {
      setIsLoading(true);
      getStudentChat(id, cookies.accessToken)
      .then((res) => {
        setChatHistory(res.data);
        console.log(res);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  }, [])

  useEffect(() => {
    chatListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return {
    id,
    chatHistory,
    chatListRef,
    isLoading
  }
}

export default useChatHistory