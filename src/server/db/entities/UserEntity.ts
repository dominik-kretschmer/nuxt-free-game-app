import pool from '../pool';
import { BaseModel } from "./baseModel";
import { User } from "../../../types/database";

/**
 * @todo Add more user fields to the user table (name, created_at, updated_at, etc.)
 * @todo Implement soft delete for entities instead of hard delete
 * @todo Add indexes to frequently queried columns for better performance
 * @todo Create proper data access objects (DAOs) or repositories for database access
 * @todo Implement a caching strategy for frequently accessed data
 * @todo Add pagination for database queries that return large result sets
 */

export class UserEntity extends BaseModel<User> {
    constructor() {
        super('user')
    }

    async findByEmail(email: string): Promise<User | null> {
        const sql = `SELECT * FROM \`${this.table}\` WHERE email = ?`
        const [rows] = await pool.execute(sql, [email])
        return Array.isArray(rows) && rows.length > 0 ? rows[0] as User : null
    }
}
