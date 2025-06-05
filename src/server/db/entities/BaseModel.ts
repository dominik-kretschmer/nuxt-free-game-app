import pool from '../pool'
import { Entity, QueryResult } from '../../../types/database'

/**
 * @todo Implement database transactions for operations that modify multiple records
 * @todo Implement soft delete for entities instead of hard delete
 * @todo Implement pagination for database queries that return large result sets
 * @todo Protect against SQL injection by using parameterized queries for table names
 * @todo Implement proper error handling with secure error messages
 * @todo Add logging for database operations
 * @todo Create interfaces for database entities
 * @todo Add optimistic locking for concurrent updates
 */

export class BaseModel<T extends Entity> {
    public table: string

    constructor(table: string) {
        this.table = table
    }

    async create(data: Partial<T>): Promise<QueryResult> {
        const cols = Object.keys(data)
        const vals = Object.values(data)
        const placeholders = cols.map(() => '?').join(', ')
        const sql = `INSERT INTO \`${this.table}\` (${cols.join(', ')}) VALUES (${placeholders})`
        const [res] = await pool.execute(sql, vals)
        return res as QueryResult
    }

    async getById(id: number): Promise<T | null> {
        const sql = `SELECT * FROM \`${this.table}\` WHERE id = ?`
        const [rows] = await pool.execute(sql, [id])
        return Array.isArray(rows) && rows.length > 0 ? rows[0] as T : null
    }

    async getAll(): Promise<T[]> {
        const sql = `SELECT * FROM \`${this.table}\``
        const [rows] = await pool.execute(sql)
        return rows as T[]
    }

    async update(id: number, data: Partial<T>): Promise<void> {
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
