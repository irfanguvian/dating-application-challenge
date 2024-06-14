import { getListUserNoSwipe } from "../repository/user-detail.repository";
import { UserDetailType } from "types/user-detail.repository";

const currentUser = (context : UserDetailType) => {
    const result = {
        success : true,
        message : "User fetched successfully",
        data : context
    }
    return result
}

const getListUserSwipe = async (context: UserDetailType) => {
    try {
        const fetchUserListForSwipe = await getListUserNoSwipe(context.user_id)
        return {
            success: true,
            message : "User list successfully",
            data: fetchUserListForSwipe
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    currentUser,
    getListUserSwipe
}

