type CreateNewSwipeHistoryParamterType = {
    userId: number;
    direction : number;
    swipeUserId: number;
}

type CreateNewUserMatchParamterType = {
    userId: number;
    matchUserId: number;
}

type CheckUserAlreadySwipedParameterType = {
    userId: number;
    swipeUserId: number;
}

type SwipeHistoryType = {
    id: number;
    user_id: number;
    direction: number;
    swipe_user_id: number;
    created_at: Date;
}

type CountUserSwipedDays = {
    userId: number;
    dateNow: string;
}

type CountUserSwipedDaysResponse = {
    swiped_user: number;
}

export {
    CountUserSwipedDays,
    CountUserSwipedDaysResponse,
    CreateNewUserMatchParamterType,
    SwipeHistoryType,
    CheckUserAlreadySwipedParameterType,
    CreateNewSwipeHistoryParamterType
}