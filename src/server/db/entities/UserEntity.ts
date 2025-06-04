import  pool  from '../pool';
import {BaseModel} from "./baseModel";

export class UserEntity extends BaseModel {
    constructor() {
        super('user')
    }

    async findByEmail(email: string): Promise<any | null> {
        const sql = `SELECT * FROM \`${this.table}\` WHERE email = ?`
        const [rows] = await pool.execute(sql, [email])
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    }
}
