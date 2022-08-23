<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TimerController;
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

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => 'jwt.verify', 'prefix' => 'auth'], function ($router) {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);

    Route::get('/projects', [ProjectController::class, 'index'])->name('project.index');
    Route::post('/projects', [ProjectController::class, 'store'])->name('project.store');
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('project.destroy');

    Route::group(['prefix' => '/projects/{id}', 'as' => 'timer.'], function ($router) {
        Route::post('/timers', [TimerController::class, 'store'])->name('store');
        Route::post('/timers/{timerId}/stop', [TimerController::class, 'stopRunning'])->name('stop');

        Route::get('/timers', [TimerController::class, 'index'])->name('index');
        Route::get('/timers/today', [TimerController::class, 'today'])->name('today');
        Route::get('/timers/active', [TimerController::class, 'running'])->name('running');
    });
});

//TODO: admin role that can register & delete users
