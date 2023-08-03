const knex = require("../knex");

class Conversation {
  static async create(sender_id, receiver_id) {
    try {
      const checkIfExists = await knex("conversations")
        .where({
          sender_id,
          receiver_id,
        })
        .orWhere({
          sender_id: receiver_id,
          receiver_id: sender_id,
        });
      if (checkIfExists.length > 0) {
        return checkIfExists;
      }
      const [conversation] = await knex("conversations")
        .insert({
          sender_id,
          receiver_id,
        })
        .returning("*");

      return conversation;
    } catch (error) {
      console.log(error);
    }
  }

  static async find(uuid) {
    try {
      const [conversation] = await knex("conversations")
        .where({ uuid })
        .first();
      return conversation || null;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Conversation;
