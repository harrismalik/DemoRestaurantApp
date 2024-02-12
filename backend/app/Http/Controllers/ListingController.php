<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use App\Models\Slot;
use App\Models\Table;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListingController extends BaseAPIController
{
    public function getSlots() : JsonResponse {
        $slots = Slot::all();
        return $this->sendResponse(['slots' => $slots],'Fetched available slots');
    }

    public function fetchTablesByDate($date) : JsonResponse {
        $tables = Table::where('is_listed',true)->with(['bookings' => function ($query) use ($date) {
            $query->with('slots')->where('booking_date',$date);
        }])->get();

        return $this->sendResponse($tables,'Fetched Tables');
    }

    public function fetchMenuList() : JsonResponse {
        $menuCategories = MenuCategory::with('menuItems')->get();

        $menu = [];
        foreach ($menuCategories as $category) {
            $menuItems = $category->menuItems->map(function ($item) {
                return ['name' => $item->name];
            });

            $menu[] = [
                'category' => $category->title,
                'items' => $menuItems,
            ];
        }

        return $this->sendResponse(['menu' => $menu],'Fetched Menu');
    }
}
