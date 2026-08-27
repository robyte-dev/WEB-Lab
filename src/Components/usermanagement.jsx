// User Management Module
//  login, logout, register, update, delete

// Initial default registered users list
export const initialUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'yitbareka1995@gmail.com',
    password: 'password123',
    role: 'ADMIN',
    fullName: 'betel befekadu'
  },
  {
    id: 2,
    username: 'robel',
    email: 'robelhilco1995@gmail.com',
    password: 'robel123',
    role: 'MANAGER',
    fullName: 'robel yitbarek'
  },
  {
    id: 3,
    username: 'mahlet',
    email: 'mahlet@gmail.com',
    password: 'password123',
    role: 'USER',
    fullName: 'Mahlet Fekadu'
  },
  {
    id: 4,
    username: 'abel',
    email: 'abelbelay1995@gmail.com',
    password: 'password1456',
    role: 'MAINTENANCE',
    fullName: 'Abel Belay'
  }
];


export function login(users, username, password) {
  const user = users.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  );
  if (!user) {
    return { success: false, message: 'User not found. Please register first.' };
  }
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }
  return { success: true, user };
}


export function logout() {
  return { success: true, currentUser: null, isLoggedIn: false };
}


export function register(users, newUser) {
  const existingUser = users.find(
    (u) => u.username.toLowerCase() === newUser.username.trim().toLowerCase()
  );
  if (existingUser) {
    return { success: false, message: 'Username is already taken!' };
  }

  const existingEmail = users.find(
    (u) => u.email.toLowerCase() === newUser.email.trim().toLowerCase()
  );
  if (existingEmail) {
    return { success: false, message: 'Email is already registered!' };
  }

  const createdUser = {
    id: Date.now(),
    username: newUser.username.trim(),
    email: newUser.email.trim(),
    password: newUser.password,
    role: newUser.role || 'USER',
    fullName: newUser.fullName || newUser.username
  };

  return {
    success: true,
    user: createdUser,
    updatedUsers: [...users, createdUser]
  };
}


export function update(users, targetUsername, updatedFields) {
  const userIndex = users.findIndex(
    (u) => u.username.toLowerCase() === targetUsername.toLowerCase()
  );

  if (userIndex === -1) {
    return { success: false, message: 'User not found for update' };
  }

  const updatedUsers = [...users];
  updatedUsers[userIndex] = {
    ...updatedUsers[userIndex],
    ...updatedFields
  };

  return {
    success: true,
    user: updatedUsers[userIndex],
    updatedUsers
  };
}



export function deleteUser(users, targetUsername) {
  const updatedUsers = users.filter(
    (u) => u.username.toLowerCase() !== targetUsername.toLowerCase()
  );

  return {
    success: true,
    updatedUsers
  };
}

export { deleteUser as delete };
