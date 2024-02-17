import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
.promise();

export async function getCanciones() {
    const [rows] = await pool.query(`SELECT * FROM canciones;`);
    return rows; 
}

export async function getCancionesById(id) {
    const [row] = await pool.query(`SELECT * FROM canciones WHERE id = ?;`, [id]);
    return row[0];
}

export async function createCanciones(titulo, artista, album) {
    const [result] = await pool.query(
     `INSERT INTO canciones (titulo, artista, album) 
     VALUES (?, ?, ?)
     `,
     [titulo, artista, album]
    );
    return result;
}

export async function deleteCanciones(id) {
    const [result] = await pool.query(
        `
        DELETE FROM canciones WHERE id = ?;
        `,
        [id]
    );
    return result;
}

//actualizar una cancion 
export async function updateCanciones(id, titulo, artista, album) {
    const [result] = await pool.query(
        `UPDATE canciones SET titulo = ?, artista = ?, album = ? WHERE id = ?`,
        [titulo, artista, album, id]
    );
    return result;
}
