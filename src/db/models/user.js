/* eslint-disable implicit-arrow-linebreak */
const knex = require("../knex");
const { hashPassword, isValidPassword } = require("../../utils/auth-utils");

class User {
  #passwordHash = null;

  constructor({ uuid, username, password }) {
    this.uuid = uuid;
    this.username = username;
    this.#passwordHash = password;
  }

  static async list() {
    try {
      const rows = await knex.select("*").from("users");
      return rows.map((user) => new User(user));
    } catch (error) {
      console.error(error);
    }
  }

  static async create({ username, password }) {
    try {
      const passwordHash = await hashPassword(password);
      const [user] = await knex
        .insert({ username, password: passwordHash })
        .into("users")
        .returning("*");
      return new User(user);
    } catch (error) {
      console.error(error);
    }
  }

  static async find(uuid) {
    try {
      const user = await knex("users").where({ uuid }).first();
      return user ? new User(user) : null;
    } catch (error) {
      console.error(error);
    }
  }

  static async findByUsername(username) {
    try {
      const user = await knex("users").where({ username }).first();
      return user ? new User(user) : null;
    } catch (error) {
      console.error(error);
    }
  }

  isValidPassword = async (password) =>
    isValidPassword(password, this.#passwordHash);
}

module.exports = User;
