import pool from './pool.ts';

/**
 */
async function main() {
    const queries = [
        `DROP TABLE IF EXISTS ` + '`user`' + `;`,
        `DROP TABLE IF EXISTS ` + '`user_fav_games`' + `;`,

        `CREATE TABLE ` + '`user`' + ` (
      ` + '`id`' + ` INT AUTO_INCREMENT PRIMARY KEY,
      ` + '`email`' + ` VARCHAR(45) NOT NULL,
      ` + '`password`' + ` VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB;`,

        `CREATE TABLE ` + '`user_fav_games`' + ` (
      ` + '`id`' + ` INT AUTO_INCREMENT PRIMARY KEY,
      ` + '`fk_user_id`' + ` INT NOT NULL,
      ` + '`game_id`' + ` INT NOT NULL,
      FOREIGN KEY (` + '`fk_user_id`' + `) REFERENCES ` + '`user`' + `(` + '`id`' + `) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB;`
    ];

    try {
        for (const query of queries) {
            await pool.execute(query);
        }
        console.log('Alle Tabellen wurden erfolgreich gedroppt und neu angelegt.');
        process.exit(0);
    } catch (error) {
        console.error('Fehler bei der Ausführung der Queries:', error);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
