import bcrypt from 'bcrypt';

const saltRounds = 12;

export async function hash(hashText: string): Promise<string> {
   return await bcrypt.hash(hashText, saltRounds);
}
