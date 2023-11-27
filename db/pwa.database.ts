import * as mysql from 'mysql2';
import env from '../env/server.env';

/**
 * Represents a connection to the MySQL database.
 */
const connection = mysql.createConnection(env.DATABASE_URL);
const promisePool = connection.promise();

/**
 * Executes a SQL query with optional parameter bindings.
 * 
 * @param sql - The SQL query to execute.
 * @param binds - An array of parameter bindings for the query.
 * @param callback - An optional callback function to handle the query results.
 */
export const query = async (sql: string, binds: any[]) => {
    const [rows, _] = await promisePool.query(sql, binds);
    return rows;
}

/**
 * Closes the database connection.
 */
export const closeConnection = () => connection.end();