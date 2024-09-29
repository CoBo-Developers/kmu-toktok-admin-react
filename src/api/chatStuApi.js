const getChat= async (accessToken, studentId) => {
    const res = await fetch(`${import.meta.env.VITE_APP_CHAT_API_URL}/api/prof?studentId=${studentId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message);
    }
  
    return res.json();
};

const postChat = async (accessToken, studentId, comment) => {
    const res = await fetch(`${import.meta.env.VITE_APP_CHAT_API_URL}/api/prof`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        comment: comment,
      }),
    });
  
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message);
    }
  
    return res.json();
}

const getChatList = async (accessToken, page, pageSize) => {
    const res = await fetch(`${import.meta.env.VITE_APP_CHAT_API_URL}/api/prof/list?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
        const message = await res.json();
        throw new Error(message);
      }
    
      return res.json();
  }

const patchChatRead = async (accessToken, studentId) => {
    const res = await fetch(`${import.meta.env.VITE_APP_CHAT_API_URL}/api/prof?studentId=${studentId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message);
    }
  
    return res.json();
}

export { getChat, postChat, getChatList, patchChatRead };