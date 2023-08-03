const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password },
  } = req;

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).send({ error: "Username already taken" });
    }
    const user = await User.create({ username, password });
    session.userId = user.uuid;
    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = createUser;
