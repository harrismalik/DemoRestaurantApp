<?php

namespace App\Http\Controllers;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Slot;
use App\Models\Table;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends BaseAPIController
{
    //ADD

    public function addSlot(Request $request) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Failed.');
        }

        $existing = Slot::where(['start_time' => $request['start_time'], 'end_time' => $request['end_time']])->first();
        if($existing) {
            return $this->sendError('Slot already exists.');
        }
        $slot = Slot::create([
            'start_time' => $request['start_time'],
            'end_time' => $request['end_time']
        ]);

        return $this->sendResponse(['slot' => $slot],'Slot added successfully.');
    }

    public function addTable(Request $request) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'table_no' => 'required|string',
            'capacity' => 'required|integer',
            'is_listed' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Failed.');
        }

        $existing = Table::where('table_no',$request['table_no'])->first();
        if($existing) {
            return $this->sendError('Table already exists. Use update endpoint to make changes.');
        }

        $table = Table::create([
            'table_no' => $request['table_no'],
            'capacity' => $request['capacity'],
            'is_listed' => $request['is_listed']
        ]);

        return $this->sendResponse(['table' => $table],'Table added successfully.');
    }

    public function addMenuCategory(Request $request) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'is_shown' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Failed.');
        }

        $existing = MenuCategory::where('title', $request['title'])->first();
        if($existing) {
            return $this->sendError('Menu category already exists.');
        }

        $menuCategory = new MenuCategory();
        $menuCategory->title = $request['title'];
        if($request['is_shown']) {
            $menuCategory->is_shown = true;
        }
        $menuCategory->save();

        return $this->sendResponse(['menuCategory' => $menuCategory],'Menu category added.');
    }

    public function addMenuItem(Request $request) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer',
            'name' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Failed.');
        }

        $existing = MenuItem::where(['category_id' => $request['category_id'], 'name' => $request['name']])->first();
        if($existing) {
            return $this->sendError('Menu item already exists under this category.');
        }

        $menuItem = MenuItem::create([
            'category_id' => $request['category_id'],
            'name' => $request['name']
        ]);

        return $this->sendResponse(['menuItem' => $menuItem],'Menu item added');
    }

    // UPDATE

    public function updateSlot(Request $request, $id) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Failed.');
        }

        $slot = Slot::find($id);
        if (!$slot) {
            return $this->sendError('Slot not found.');
        }

        $existing = Slot::where(['start_time' => $request['start_time'], 'end_time' => $request['end_time']])->whereNot('id',$slot->id)->first();
        if($existing) {
            return $this->sendError('Cannot update, conflicting slot.');
        }

        $slot->update([
            'start_time' => $request['start_time'],
            'end_time' => $request['end_time']
        ]);

        return $this->sendResponse(['slot' => $slot], 'Slot updated successfully.');
    }

    public function updateTable(Request $request, $id) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'capacity' => 'sometimes|integer',
            'is_listed' => 'sometimes|boolean'
        ]);

        if ($validator->fails() || !(isset($request['capacity']) || isset($request['is_listed']))) {
            return $this->sendError('Validation Failed.');
        }

        $table = Table::find($id);

        if (!$table) {
            return $this->sendError('Table not found.');
        }

        $table->update([
            'capacity' => isset($request['capacity']) ? $request['capacity'] : $table->capacity,
            'is_listed' => isset($request['is_listed']) ? $request['is_listed'] : $table->is_listed
        ]);

        return $this->sendResponse(['table' => $table], 'Table updated successfully.');
    }

    public function updateMenuCategory(Request $request, $id) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string',
            'is_shown' => 'sometimes|boolean'
        ]);

        if ($validator->fails() || !(isset($request['title']) || isset($request['is_shown']))) {
            return $this->sendError('Validation Failed.');
        }

        $menuCategory = MenuCategory::find($id);

        if (!$menuCategory) {
            return $this->sendError('Menu category not found.');
        }

        $menuCategory->update([
            'title' => isset($request['title']) ? $request['title'] : $menuCategory->title,
            'is_shown' => isset($request['is_shown']) ? $request['is_shown'] : $menuCategory->is_shown
        ]);

        return $this->sendResponse(['menuCategory' => $menuCategory], 'Menu category updated successfully.');
    }

    public function updateMenuItem(Request $request, $id) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'category_id' => 'sometimes|integer',
            'name' => 'sometimes|string'
        ]);

        if ($validator->fails() || !(isset($request['category_id']) || isset($request['name']))) {
            return $this->sendError('Validation Failed.');
        }

        $menuItem = MenuItem::find($id);

        if (!$menuItem) {
            return $this->sendError('Menu item not found.');
        }

        $existing = MenuItem::where(['category_id' => $request['category_id'], 'name' => $request['name']])->whereNot('id',$menuItem->id)->find();
        if($existing) {
            return $this->sendError('Cannot update, conflicting item.');
        }

        $menuItem->update([
            'category_id' => isset($request['category_id']) ? $request['category_id'] : $menuItem->category_id,
            'name' => isset($request['name']) ? $request['name'] : $menuItem->name
        ]);

        return $this->sendResponse(['menuItem' => $menuItem], 'Menu item updated successfully.');
    }

    // DELETE

    public function deleteSlot($id) : JsonResponse {
        $slot = Slot::find($id);

        if (!$slot) {
            return $this->sendError('Slot not found.');
        }

        $slot->delete();

        return $this->sendResponse([], 'Slot deleted successfully.');
    }

    public function deleteTable($id) : JsonResponse {
        $table = Table::find($id);

        if (!$table) {
            return $this->sendError('Table not found.');
        }

        $table->delete();

        return $this->sendResponse([], 'Table deleted successfully.');
    }

    public function deleteMenuCategory($id) : JsonResponse {
        $menuCategory = MenuCategory::find($id);

        if (!$menuCategory) {
            return $this->sendError('Menu category not found.');
        }

        $menuCategory->delete();

        return $this->sendResponse([], 'Menu category deleted successfully.');
    }

    public function deleteMenuItem($id) : JsonResponse {
        $menuItem = MenuItem::find($id);

        if (!$menuItem) {
            return $this->sendError('Menu item not found.');
        }

        $menuItem->delete();

        return $this->sendResponse([], 'Menu item deleted successfully.');
    }

}
