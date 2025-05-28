import bcrypt from 'bcryptjs';

export const bcryptAdapter = {
    encrypt: async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },
    compare: async (password: string, hash: string) => {
        return await bcrypt.compare(password, hash);
    }
}