const notifyStatus = (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ message: 'userId and message are required' });
  }
  console.log(`Notification to User ${userId}: ${message}`);
  res.status(200).json({ message: 'Notification sent', userId, content: message });
};
module.exports = {
  notifyStatus
};
  
