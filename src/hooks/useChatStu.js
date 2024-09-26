import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getChat, postChat, patchChatRead, getChatList } from '../api/chatStuApi';
import { useCookies } from 'react-cookie';
import useChatListStore from '../store/useChatListStore';

const useChatStu = () => {
  const { studentId } = useParams();
  const [cookies] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const [chatContent, setChatContent] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef();
  const chatContentRef = useRef();
  const sendRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { setChatList } = useChatListStore();

  useEffect(() => {
    if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatContent]);

  useEffect(() => {
    if (studentId) {
      setIsLoading(true);
      getChat(cookies.accessToken, studentId)
        .then((chat) => {
          setChatContent(chat.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
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
    inputRef.current.value = '';
    inputRef.current.style.height = 'auto';
    if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
    if (newMessage.trim() === '') return;

    setIsLoading(true);
    postChat(cookies.accessToken, studentId, newMessage)
      .then(() => {
        setIsLoading(true);
        getChat(cookies.accessToken, studentId)
          .then((chat) => {
            setChatContent(chat.data);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
      setNewMessage('');
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

  const setChatRead = (studentId) => {
    setIsLoading(true);
    patchChatRead(cookies.accessToken, studentId)
      .then(() => {
        setIsLoading(true);
        getChatList(cookies.accessToken, 0, import.meta.env.VITE_CHATLIST_SIZE)
            .then((res) => {
              setChatList(res.data.chatList);
          })
          .catch((error) => {
            alert(error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    isLoading,
    setChatRead
  };
};

export default useChatStu;