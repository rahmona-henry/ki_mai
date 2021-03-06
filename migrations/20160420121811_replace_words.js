
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('replace_words', function(table){
    table.increments()
    table.integer('userid')
    table.string('from_word')
    table.string('to_word')
    table.string('definition')
    table.timestamps()
    table.unique(['from_word', 'to_word', 'definition'])
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('replace_words')
};
