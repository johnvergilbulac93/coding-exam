<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/auth/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix' => 'auth'], function () {
    Route::post('/login',   [LoginController::class, 'login']);
    Route::post('/register', [RegisterController::class, 'register']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('user')->group(function () {
        Route::get('/',   [UserController::class, 'index']);
        Route::post('/',   [UserController::class, 'create']);
        Route::delete('/{id}',   [UserController::class, 'delete']);
        Route::patch('/',   [UserController::class, 'update']);

        Route::post('/logout',   [LoginController::class, 'logout']);
    });
    Route::prefix('role')->group(function () {

        Route::get('/',   [RoleController::class, 'index']);
        Route::post('/',   [RoleController::class, 'create']);
        Route::delete('/{id}',   [RoleController::class, 'delete']);
        Route::patch('/',   [RoleController::class, 'update']);

        Route::get('/show',   [RoleController::class, 'show_roles']);
    });
});
