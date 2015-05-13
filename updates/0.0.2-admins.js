/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 */

exports.create = {
  Users: [
    { 'name.first': 'admin', 'name.last': 'ett', email: 'admin@gamlaposten.se', password: 'YouveGotMail', isAdmin: true },
    { 'name.first': 'admin', 'name.last': 'två', email: 'admin2@gamlaposten.se', password: 'YouveGotMail', isAdmin: true }
  ]
};

