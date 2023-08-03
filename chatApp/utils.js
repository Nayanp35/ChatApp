export const findUserById = (users, userId) => {
  const user = users.find((u) => u.uuid === userId);
  return user;
};
