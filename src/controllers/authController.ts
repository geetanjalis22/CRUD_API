import { Request, Response } from 'express';

export const logout = async (req: Request, res: Response) => {
    // Although JWTs cannot be invalidated server-side without Redis or a database,
    // The client should discard the token to effectively log out.
    res.json({ message: 'Logout successful' });
};
