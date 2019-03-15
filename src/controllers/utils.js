export default res => ({ message }) => {
  res.status(500).json({
    message,
  });
};

export const valUserType = (user, typeNeeded) => {
  if (!user) {
    return false;
  }
  if (typeof typeNeeded === 'string') {
    return user.type === typeNeeded;
  }
  if (typeof typeNeeded === 'array') {
    return typeNeeded.indexOf(user.type) >= 0;
  }
  throw new Error('Bad typeNeeded');
};
