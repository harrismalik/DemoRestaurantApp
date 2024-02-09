<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    use HasFactory;
    protected $fillable = ['start_time', 'end_time'];

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'slot_booking');
    }
}
