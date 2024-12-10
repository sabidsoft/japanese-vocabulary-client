export interface User {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InitialState {
    token: string | null;
    user: User | null;
    isLoading: boolean;
}