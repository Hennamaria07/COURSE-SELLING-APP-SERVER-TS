import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "test!"
    })
}