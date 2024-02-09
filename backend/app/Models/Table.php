<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;
    protected $fillable = ['table_no', 'capacity', 'is_listed'];

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'table_booking');
    }
}
