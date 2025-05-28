import { connection } from "../db-connection"
import type { ResultSetHeader } from 'mysql2/promise'

export class BaseModel {
    table: string

    constructor(table: string) {
        this.table = table
    }

    async create(data: Record<string, any>): Promise<number> {
        const cols = Object.keys(data)
        const vals = Object.values(data)
        const placeholders = cols.map(() => '?').join(', ')
        const sql = `INSERT INTO \`${this.table}\` (${cols.join(', ')}) VALUES (${placeholders})`
        const [res] = await connection.execute<ResultSetHeader>(sql, vals)
        return res.insertId
    }

    async getById(id: number): Promise<any|null> {
        const sql = `SELECT * FROM \`${this.table}\` WHERE id = ?`
        const [rows] = await connection.execute<any[]>(sql, [id])
        return rows[0] || null
    }

    async getAll(): Promise<any[]> {
        const sql = `SELECT * FROM \`${this.table}\``
        const [rows] = await connection.execute<any[]>(sql)
        return rows
    }

    async update(id: number, data: Record<string, any>): Promise<void> {
        const cols = Object.keys(data)
        const vals = Object.values(data)
        const assignments = cols.map(c => `\`${c}\` = ?`).join(', ')
        const sql = `UPDATE \`${this.table}\` SET ${assignments} WHERE id = ?`
        await connection.execute(sql, [...vals, id])
    }

    async delete(id: number): Promise<void> {
        const sql = `DELETE FROM \`${this.table}\` WHERE id = ?`
        await connection.execute(sql, [id])
    }
}
