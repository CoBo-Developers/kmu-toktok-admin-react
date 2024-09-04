const addCategory= async (accessToken, categoryName) => {
    const res = await fetch(import.meta.env.VITE_APP_FILE_API_URL + '/api/professor/category', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: categoryName,
        })
    });
  
    if (!res.ok) {
      const message = (await res.json()).message;
      throw new Error(message);
    }
  
    return res.json();
}

const modifyCategory = async (accessToken, categoryId, name) => {
    const res = await fetch(`${import.meta.env.VITE_APP_FILE_API_URL}/api/professor/category`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId: categoryId,
        name: name,
      })
    });
  
    if (!res.ok) {
      const message = (await res.json()).message;
      throw new Error(message);
    }
  
    return res.json();
}

const deleteCategory = async (accessToken, categoryId) => {
    const res = await fetch(`${import.meta.env.VITE_APP_FILE_API_URL}/api/professor/category?categoryId=${categoryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
  
    if (!res.ok) {
      const message = (await res.json()).message;
      throw new Error(message);
    }
  
    return res.json();
}

export { addCategory, modifyCategory, deleteCategory };