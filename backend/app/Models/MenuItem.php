<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;
    protected $fillable = ['category_id', 'name'];

    public function menuCategory()
    {
        return $this->belongsTo(MenuCategory::class, 'category_id');
    }
}
