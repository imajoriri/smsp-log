'use strict';

var dbm;
var type;
var seed;
var tableName = "logs";

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable(tableName, {
    id: {type: 'int', primaryKey: true},
    skill_id: {type: 'int', notNull: true},
    skill_user_id: {type: 'int', notNull: false},
    handler_name: {type: 'string'},
    created_at: 'datetime',
    deleted_at: 'datetime',
  });
  return null;
};

exports.down = function(db) {
  db.dropTable(tableName);
  return null;
};

exports._meta = {
  "version": 1
};
