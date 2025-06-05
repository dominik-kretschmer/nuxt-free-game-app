export interface User {
  id: number;
  email: string;
  password: string;
}

export interface UserFavGame {
  id: number;
  fk_user_id: number;
  game_id: number;
}

export interface Entity {
  id: number;
  [key: string]: unknown;
}

export type QueryResult = {
  affectedRows?: number;
  insertId?: number;
  changedRows?: number;
};
