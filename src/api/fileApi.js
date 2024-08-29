const getCategoryList = async (accessToken) => {
  const res = await fetch(import.meta.env.VITE_APP_FILE_API_URL + '/api/student/category/list', {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.json();
}
const getFileList = async (accessToken, categoryId) => {
  const res = await fetch(`${import.meta.env.VITE_APP_FILE_API_URL}/api/file/list?categoryId=${categoryId}`, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }
  
  return res.json();
}

const fileDownload = async (accessToken, fileId) => {
  const res = await fetch(`${import.meta.env.VITE_APP_FILE_API_URL}/api/file?fileId=${fileId}`, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.blob();
}

const fileModify = async (accessToken, fileId, newFileName, categoryId) => {
  const res = await fetch(`${import.meta.env.VITE_APP_FILE_API_URL}/api/professor/file`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileId: fileId,
      name: newFileName,
      categoryId: categoryId
    })
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.json();
}

const fileAdd = async (accessToken, fileName, categoryId, file) => {
  const formData = new FormData();
  formData.append('fileName', fileName);
  formData.append('categoryId', categoryId);
  formData.append('multipartFile', file);

  const res = await fetch(`${import.meta.env.VITE_APP_FILE_API_URL}/api/professor/file`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.json();
}
    
export { getCategoryList, getFileList, fileDownload, fileModify, fileAdd };