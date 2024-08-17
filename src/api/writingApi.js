const getWritingList = async (token) => {
  const res = await fetch(import.meta.env.VITE_APP_WRITING_API_URL + '/api/professor/list', {
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

const postWriting = async (data, token) => {
  const res = await fetch(import.meta.env.VITE_APP_WRITING_API_URL + '/api/professor', {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.json();
}

const getWritingSubmitList = async (token) => {
  const res = await fetch(import.meta.env.VITE_APP_WRITING_API_URL + '/api/professor/writing-list', {
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

export { getWritingList, postWriting, getWritingSubmitList }