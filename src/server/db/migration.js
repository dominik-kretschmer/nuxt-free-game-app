import pool from './pool.ts';

/**
 * @todo Convert migration.js to TypeScript for consistency with the rest of the project
 * @todo Implement database migrations with versioning instead of dropping tables
 * @todo Add more user fields to the user table (name, created_at, updated_at, etc.)
 * @todo Add indexes to frequently queried columns for better performance
 * @todo Create database backup and restore procedures
 * @todo Set up automated database migrations during deployment
 * @todo Add proper error handling and logging for migration failures
 * @todo Implement transaction for all migration operations
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
    } catch (error) {
        console.error('Fehler bei der Ausführung der Queries:', error);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
