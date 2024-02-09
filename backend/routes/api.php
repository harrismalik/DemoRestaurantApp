<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ListingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth Routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::prefix('slots')->group(function () {
        Route::post('', [AdminController::class,'addSlot']);
        Route::put('{id}', [AdminController::class,'updateSlot']);
        Route::delete('{id}', [AdminController::class,'deleteSlot']);
    });
    Route::prefix('tables')->group(function () {
        Route::post('', [AdminController::class,'addTable']);
        Route::put('{id}', [AdminController::class,'updateTable']);
        Route::delete('{id}', [AdminController::class,'deleteTable']);
    });
    Route::prefix('menu')->group(function () {
        Route::prefix('categories')->group(function () {
            Route::post('', [AdminController::class,'addMenuCategory']);
            Route::put('{id}', [AdminController::class,'updateMenuCategory']);
            Route::delete('{id}', [AdminController::class,'deleteMenuCategory']);
        });
        Route::prefix('items')->group(function () {
            Route::post('', [AdminController::class,'addMenuItem']);
            Route::put('{id}', [AdminController::class,'updateMenuItem']);
            Route::delete('{id}', [AdminController::class,'deleteMenuItem']);
        });
    });
});
