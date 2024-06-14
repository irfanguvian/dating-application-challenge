type CreateNewOrderParameterType = {
    userId: number;
    orderNumber: string;
    totalPrice: number;
    description: string;
}

type UpdateOrderParameterType = {
    orderId: number;
    status: string;
}

type UpdateOrderToFailedParameterType = {
    userId: number;
}

type GetOrderByIdParameterType = {
    orderId: number;
    userId: number;
}

export {
    UpdateOrderToFailedParameterType,
    GetOrderByIdParameterType,
    CreateNewOrderParameterType,
    UpdateOrderParameterType
}