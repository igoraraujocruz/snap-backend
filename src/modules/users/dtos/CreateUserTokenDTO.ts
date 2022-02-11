export interface CreateUserTokenDTO {
    userId: string;
    expiresDate: Date;
    refreshToken: string;
}
