import {AxiosResponse} from "axios";
import apiService from "../api/apiService";
import {AUTH} from "../api/endpoints";
import {ApiResponse} from "../../types/common/types";

class AuthService {
    static async login(email: string, password: string): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await apiService.post(AUTH.LOGIN, { email, password });
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    static async signup(name:string, email:string, password:string, repeat_password:string): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await apiService.post(AUTH.SIGNUP, {
                name,
                email,
                password,
                repeat_password
            });
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    static async logout(token:string): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await apiService.post(AUTH.LOGOUT, null, { headers: { Authorization: "Bearer " + token } });
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default AuthService;
