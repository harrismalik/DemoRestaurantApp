<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends BaseAPIController
{
    public function createNewBooking(Request $request) {
        $validator = Validator::make($request->all(), [
            'booking_date' => 'required|date',
            'customer_phone_number' => 'required|string',
            'customer_note' => 'nullable|string',
            'slot_id' => 'required|exists:slots,id',
            'table_ids.*' => 'required|exists:tables,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Failed.');
        }

        $booking_ref = uniqid('cf_');
        $booking = Booking::create([
            'booking_ref' => $booking_ref,
            'booked_by' => auth()->user()->id,
            'customer_phone_number' => $request['customer_phone_number'],
            'customer_note' => $request['customer_note'] ?: '',
            'booking_date' => $request['booking_date'],
        ]);

        $booking->slots()->attach($request['slot_id']);
        $booking->tables()->attach($request['table_ids']);

        return $this->sendResponse(['booking' => $booking],'Booked successfully');
    }
}
