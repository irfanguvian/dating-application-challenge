type CreateNewSubcriptionParameterType = {
    userId: number;
    status: number;
}

type UpdateSubcriptionParameterType = {
    userId: number;
    status: string;
    endDate: string;
}

type CheckSubcriptionParameterType = {
    userId: number;
}

type SubcriptionType = {
    id: number;
    user_id: number;
    end_date: string;
    status: number;
    created_at: string;
}

export {
    SubcriptionType,
    CheckSubcriptionParameterType,
    CreateNewSubcriptionParameterType,
    UpdateSubcriptionParameterType
}