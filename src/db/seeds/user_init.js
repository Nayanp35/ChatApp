const User = require("../models/user");

exports.seed = async (knex) => {
  await User.create({ username: "john_doe", password: "123" });
  await User.create({ username: "jane_smith", password: "123" });
  await User.create({ username: "emily_j", password: "123" });
  await User.create({ username: "david_c", password: "123" });
  await User.create({ username: "susan123", password: "123" });
  await User.create({ username: "alex_m", password: "123" });
  await User.create({ username: "laura_789", password: "123" });
  await User.create({ username: "robert_m", password: "123" });
  await User.create({ username: "sophia_r", password: "123" });
};
