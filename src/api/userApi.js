const getUserList = async (page, pageSize) => {
  let res = await fetch(import.meta.env.VITE_APP_API_URL + `/api/user/list?page=${page}&pageSize=${pageSize}`)
  
  if (!res.ok) {
    let message = await res.json();
    throw new Error(message);
  }

  return res.json();
}

export { getUserList };