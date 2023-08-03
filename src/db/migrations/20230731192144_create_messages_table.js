/* eslint-disable implicit-arrow-linebreak */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("messages", (table) => {
    table.uuid("uuid").defaultTo(knex.fn.uuid()).unique();
    table.string("conversation_id").notNullable();
    table.string("sender_id").notNullable();
    table.string("receiver_id").notNullable();
    table.string("content").notNullable();
    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("messages");
