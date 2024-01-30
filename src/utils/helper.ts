export const getISOString = (date?: string) => {
  const offset = new Date().getTimezoneOffset() * 60000;

  if (date) {
    return new Date(new Date(date).getTime() - offset)
      .toISOString()
      .substring(0, 16);
  }

  return new Date(new Date(Date.now() - offset)).toISOString().substring(0, 16);
};
