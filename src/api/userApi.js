const getUserList = async (page, pageSize, token) => {
  let res = await fetch(import.meta.env.VITE_APP_API_URL + `/api/user/list?page=${page}&pageSize=${pageSize}`, {
    headers: {
      'authorization': 'Bearer ' + token
    }
  })
  
  if (!res.ok) {
    let message = await res.json();
    throw new Error(message);
  }

  return res.json();
}

const putUser = async (studentId, registerState, newRole) => {
  let res = await fetch(import.meta.env.VITE_APP_API_URL + '/api/user', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      studentId: studentId,
      registerState: registerState,
      role: newRole
    })
  });

  if (!res.ok) {
    let message = await res.json();
    throw new Error(message);
  }

  return res.json();
}

export { getUserList, putUser };