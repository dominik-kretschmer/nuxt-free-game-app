import  pool  from '../pool'

export class BaseModel {
    public table: string

    constructor(table: string) {
        this.table = table
    }

    async create(data: Record<string, any>): Promise<any> {
        const cols = Object.keys(data)
        const vals = Object.values(data)
        const placeholders = cols.map(() => '?').join(', ')
        const sql = `INSERT INTO \`${this.table}\` (${cols.join(', ')}) VALUES (${placeholders})`
        const [res] = await pool.execute(sql, vals)
        return res
    }

    async getById(id: number): Promise<any | null> {
        const sql = `SELECT * FROM \`${this.table}\` WHERE id = ?`
        const [rows] = await pool.execute(sql, [id])
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    }

    async getAll(): Promise<any[]> {
        const sql = `SELECT * FROM \`${this.table}\``
        const [rows] = await pool.execute(sql)
        return rows as any[]
    }

    async update(id: number, data: Record<string, any>): Promise<void> {
        const cols = Object.keys(data)
        const vals = Object.values(data)
        const assignments = cols.map(c => `\`${c}\` = ?`).join(', ')
        const sql = `UPDATE \`${this.table}\` SET ${assignments} WHERE id = ?`
        await pool.execute(sql, [...vals, id])
    }

    async delete(id: number): Promise<void> {
        const sql = `DELETE FROM \`${this.table}\` WHERE id = ?`
        await pool.execute(sql, [id])
    }
}
