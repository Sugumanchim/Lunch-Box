exports.isBeforeCutoff = () => {
  const now = new Date();
  const pstOffset = 8 * 60;
  const nowUTC = now.getTime() + (now.getTimezoneOffset() * 60000);
  const pstNow = new Date(nowUTC - (pstOffset * 60000));
  return pstNow.getHours() < 9 || (pstNow.getHours() === 9 && pstNow.getMinutes() <= 30);
};
