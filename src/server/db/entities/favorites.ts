import { BaseModel } from './BaseModel';
import { Entity } from '~/types/database';
import pool from '../pool';

const favorites = new Map<string, Set<string>>();

export class Favorites extends BaseModel<Entity> {
  constructor() {
    super('user_fav_games');
  }

  async removeFavorite(userId: string, gameId: string) {
    const sql = `DELETE FROM \`${this.table}\` WHERE fk_user_id = ? AND game_id = ?`;
    await pool.execute(sql, [userId, gameId]);
  }

  async getAllByUserId(userId: string): Promise<Entity[]> {
    const sql = `SELECT *
                 FROM \`${this.table}\`
                 WHERE fk_user_id = ?`;
    const [rows] = await pool.execute(sql, [userId]);
    return rows as Entity[];
  }
}
