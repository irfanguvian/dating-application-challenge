type UserDetailType = {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_premium: boolean;
    created_at: Date;
    updated_at: Date;
}

type CreateNewUserDetailArgumentType = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
}


export {
    UserDetailType,
    CreateNewUserDetailArgumentType
}