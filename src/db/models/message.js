const knex = require("../knex");

class Message {
  static async create(conversation_id, sender_id, receiver_id, content) {
    try {
      const message = await knex("messages")
        .insert({
          conversation_id,
          sender_id,
          receiver_id,
          content,
        })
        .returning("*");
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  static async list(conversation_id) {
    try {
      const messages = await knex("messages")
        .select("*")
        .where({ conversation_id });
      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  static async getLastMessage(sender_id, receiver_id) {
    try {
      const message = await knex("messages")
        .select("*")
        .where({
          sender_id,
          receiver_id,
        })
        .orWhere({
          sender_id: receiver_id,
          receiver_id: sender_id,
        });
      return message[message.length - 1];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Message;
