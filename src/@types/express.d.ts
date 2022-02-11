declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
        files: Express.Multer.File[];
    }
}
