import bcrypt from "bcrypt";

const saltRounds = 10;

export function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
    return  bcrypt.compare(password, hash);
}