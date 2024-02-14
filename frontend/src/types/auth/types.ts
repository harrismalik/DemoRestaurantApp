export interface AuthState {
    isAuthenticated: boolean;
    response: string | null;
    error: boolean;
    user: {
        name:string,
        email:string
    };
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    repeat_password: string;
}

export interface LogoutPayload {
    token: string;
}
