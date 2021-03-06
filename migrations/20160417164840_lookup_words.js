
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('lookup_words', function(table){
    table.increments()
    table.integer('userid')
    table.string('word')
    table.timestamps()
    table.unique(['userid', 'word'])
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('lookup_words')

};
