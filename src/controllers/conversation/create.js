const createConversation = async (req, res) => {
  const {
    session: { userId },
    db: { Conversation },
    body: { receiverId },
  } = req;

  try {
    if (!receiverId || !userId) {
      return res.status(500).send("Error creating conversation");
    }
    const conversation = await Conversation.create(userId, receiverId);
    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating conversation");
  }
};

module.exports = createConversation;
