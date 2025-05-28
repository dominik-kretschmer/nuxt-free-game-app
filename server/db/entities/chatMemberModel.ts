
import { BaseModel } from './baseModel'
import {connection} from "~/server/db/db-connection";

export class ChatMemberModel extends BaseModel {
    constructor() {
        super('chat_members')
    }

    async findByChatId(chatId: number) {
        const sql = `SELECT * FROM \`${this.table}\` WHERE fk_chat_id = ?`
        const [rows] = await connection.execute<any[]>(sql, [chatId])
        return rows
    }
}

export const chatMemberModel = new ChatMemberModel()
