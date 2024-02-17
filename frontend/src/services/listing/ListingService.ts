import {AxiosResponse} from "axios";
import apiService from "../api/apiService";
import {LISTINGS} from "../api/endpoints";
import {ApiResponse} from "../../types/common/types";

class ListingService {
    static async getTables(date: string): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await apiService.get(LISTINGS._TABLES.replace('_',date));
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    static async getMenu(): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await apiService.get(LISTINGS.MENU);
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    static async getSlots(): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await apiService.get(LISTINGS.SLOTS);
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    static async getMyBookings(token: string): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await apiService.get(LISTINGS.MY_BOOKINGS,{ headers: { Authorization: "Bearer " + token } });
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default ListingService;
