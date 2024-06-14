type CreateTokenUserArgumentType = {
    accessId: string;
    userId: number;
    endDate: string;
}

type TokenUserType = {
    accessId: string;
    userId: number;
}

export {
    TokenUserType,
    CreateTokenUserArgumentType
}