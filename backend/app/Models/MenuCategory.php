<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuCategory extends Model
{
    use HasFactory;
    protected $fillable = ['title','is_shown'];

    public function menuItems()
    {
        return $this->hasMany(MenuItem::class,'category_id');
    }
}
