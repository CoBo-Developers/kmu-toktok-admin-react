const getStudentChat = async (studentId, token) => {
  const res = await fetch(import.meta.env.VITE_APP_CHAT_API_URL + '/api/chat/student?studentId=' + studentId, {
    headers: {
      'authorization': 'Bearer ' + token
    }
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.json();
}

export { getStudentChat };