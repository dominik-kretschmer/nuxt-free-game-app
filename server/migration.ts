import { createConnection } from 'mysql2/promise';

async function main() {
    const connection = await createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'your_database',
    });

    const queries = [
        `DROP TABLE IF EXISTS ` + '`chat_members`' + `;`,
        `DROP TABLE IF EXISTS ` + '`chat`' + `;`,
        `DROP TABLE IF EXISTS ` + '`user`' + `;`,

        `CREATE TABLE ` + '`user`' + ` (
      ` + '`id`' + ` INT AUTO_INCREMENT PRIMARY KEY,
      ` + '`email`' + ` VARCHAR(45) NOT NULL,
      ` + '`password`' + ` VARCHAR(255) NOT NULL,
      ` + '`picture`' + ` MEDIUMBLOB
    ) ENGINE=InnoDB;`,

        `CREATE TABLE ` + '`chat`' + ` (
      ` + '`id`' + ` INT AUTO_INCREMENT PRIMARY KEY
    ) ENGINE=InnoDB;`,

        `CREATE TABLE ` + '`chat_members`' + ` (
      ` + '`id`' + ` INT AUTO_INCREMENT PRIMARY KEY,
      ` + '`fk_user_id`' + ` INT NOT NULL,
      ` + '`fk_chat_id`' + ` INT NOT NULL,
      FOREIGN KEY (` + '`fk_user_id`' + `) REFERENCES ` + '`user`' + `(` + '`id`' + `) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (` + '`fk_chat_id`' + `) REFERENCES ` + '`chat`' + `(` + '`id`' + `) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB;`
    ];

    try {
        for (const query of queries) {
            await connection.execute(query);
        }
        console.log('Alle Tabellen wurden erfolgreich gedroppt und neu angelegt.');
    } catch (error) {
        console.error('Fehler bei der Ausführung der Queries:', error);
    } finally {
        await connection.end();
    }
}

await main();
