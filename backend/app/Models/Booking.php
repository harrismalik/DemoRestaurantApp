<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = ['booking_ref', 'booked_by', 'customer_phone_number', 'customer_note'];

    public function tables()
    {
        return $this->belongsToMany(Table::class, 'table_booking');
    }

    public function slots()
    {
        return $this->belongsToMany(Slot::class, 'slot_booking');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'booked_by');
    }
}
