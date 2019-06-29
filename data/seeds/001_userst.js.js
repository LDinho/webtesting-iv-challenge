exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        { id: 1, name: 'sam' },
        { id: 2, name: 'frodo' },
        { id: 3, name: 'jim' },
        { id: 4, name: 'mary' },
      ]);
    });
};
