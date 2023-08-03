const showMe = async (req, res) => {
  try {
    const {
      session: { userId },
      db: { User },
    } = req;

    const user = await User.find(userId);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = showMe;
