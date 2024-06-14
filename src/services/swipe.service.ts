import { connection } from "../index";
import { isNil } from "lodash";
import { checkUserAlreadySwiped, countUserSwipeDays, createNewMatchHistory, createNewSwipeHistory } from "../repository/swipe-history.repository";
import { SwipeHandlerParameterType } from "types/swipe.service";
import moment from 'moment';

const swipeDirectionMap = {
    left : 0,
    right : 1

}

const swipeHandler = async (body: SwipeHandlerParameterType) => {
    return connection.transaction(async (trx) => {
        try {
            if(isNil(body.userSwipeId)){
                throw new Error("userSwipeId is required")
            }

            if(['left', 'right'].indexOf(body.direction) == -1){
                throw new Error("Invalid swipe direction")
            }

            const parameterGetUserById = {
                userId : body.userId,
                swipeUserId : body.userSwipeId
            }

            if(body.isPremium == false) {
                const now = moment().format('YYYY-MM-DD')
                const countUserSwiped = await countUserSwipeDays({userId : body.userId, dateNow : now})

                if(countUserSwiped[0].swiped_user >= 10) {
                    throw new Error("You have reached the limit of swiping user")
                }
            }
    
            // check user already swiped before
    
            const checkUserSwiped = await checkUserAlreadySwiped(parameterGetUserById)
    
            if(!isNil(checkUserSwiped) && checkUserSwiped.length > 0) {
                throw new Error("User already swiped")
            }
    
            const parameterCreateNewSwipe = {
                userId : body.userId,
                swipeUserId : body.userSwipeId,
                direction : swipeDirectionMap['right']
            }
    
            const paramterUserMatch = {
                userId : body.userId,
                matchUserId : body.userSwipeId,
            }
    
            const createNewSwipeResponse = await createNewSwipeHistory(parameterCreateNewSwipe, trx)

            if(body.direction === 'right') { 
                const createNewUserMatchResponse = await createNewMatchHistory(paramterUserMatch, trx)
            } 
            
            return {
                success: true,
                message : "Swipe successfully",
            }
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    })
};

export {
    swipeHandler
}