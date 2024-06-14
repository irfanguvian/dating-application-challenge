type CreateNewUserArgumentType = {
    username: string;
    password: string;
}

type UserType = {
    id: number;
    username: string;
    password: string;
    created_at: Date;
    login_at: Date;
}

export {
    CreateNewUserArgumentType,
    UserType
}