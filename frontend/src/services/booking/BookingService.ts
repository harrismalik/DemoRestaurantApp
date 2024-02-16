import {AxiosResponse} from "axios";
import apiService from "../api/apiService";
import {BOOKINGS} from "../api/endpoints";
import {ApiResponse} from "../../types/common/types";
import {BookPayload} from "../../types/booking/types";

class BookingService {
    static async bookNow(bookPayload:BookPayload): Promise<ApiResponse> {
        try {
            const token = bookPayload.token
            delete bookPayload.token
            const response: AxiosResponse<ApiResponse> = await apiService.post(BOOKINGS.NEW_BOOKING, bookPayload, { headers: { Authorization: "Bearer " + token } });
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default BookingService;
