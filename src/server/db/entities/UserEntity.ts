import pool from '../pool';
import { BaseModel } from "./BaseModel";
import { User } from "~/types/database";

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
