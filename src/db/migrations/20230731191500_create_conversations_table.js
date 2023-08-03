/* eslint-disable implicit-arrow-linebreak */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = (knex) =>
  knex.schema.createTable("conversations", (table) => {
    table.uuid("uuid").defaultTo(knex.fn.uuid()).unique();
    table.string("sender_id").notNullable();
    table.string("receiver_id").notNullable();
    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("conversations");
