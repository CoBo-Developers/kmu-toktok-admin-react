import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getChat, postChat } from '../api/chatStuApi';
import { useCookies } from 'react-cookie';

const useChatStu = () => {
  const { studentId } = useParams();
  const [cookies] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const [chatContent, setChatContent] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef();
  const chatContentRef = useRef();
  const sendRef = useRef();

  useEffect(() => {
    if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatContent]);

  useEffect(() => {
    if (studentId) {
      getChat(cookies.accessToken, studentId)
        .then((chat) => {
          setChatContent(chat.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [studentId, cookies.accessToken]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (inputRef.current) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newChat = {
      comment: newMessage,
      localDateTime: new Date().toISOString(),
      question: false,
    };

    postChat(cookies.accessToken, studentId, newMessage)
      .then(() => {
        setChatContent([...chatContent, newChat]);
        setNewMessage('');
        inputRef.current.style.height = 'auto';
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }
  };


  return {
    chatContent,
    newMessage,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleKeyUp,
    inputRef,
    chatContentRef,
    sendRef,
  };
};

export default useChatStu;