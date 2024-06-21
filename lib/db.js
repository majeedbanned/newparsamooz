import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // e.g., 'localhost'
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Set to false for local development
    trustServerCertificate: true, // Necessary for self-signed certificates
    enableArithAbort: true,
  },
};

export async function getData() {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT top 40 * FROM q');
    return result.recordset;
  } catch (err) {
    console.error(err);
    return [];
  }
}
