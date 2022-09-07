import * as db from 'knex';

const closeConnection = () => db.destroy();

export default {
    db,
    closeConnection
};