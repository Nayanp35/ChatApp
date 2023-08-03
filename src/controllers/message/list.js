const listByConversationId = async (req, res) => {
  try {
    const {
      db: { Message },
      params: { id },
    } = req;

    if (!id) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    const messages = await Message.list(id);
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = listByConversationId;
