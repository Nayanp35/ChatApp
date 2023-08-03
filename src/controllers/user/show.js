const showUser = async (req, res) => {
  try {
    const {
      db: { User },
      params: { id },
    } = req;

    if (isNaN(id)) return res.sendStatus(404);
    const user = await User.find(id);
    if (!user) return res.sendStatus(404);

    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = showUser;
