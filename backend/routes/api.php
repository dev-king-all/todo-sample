<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::apiResource('todos', TodoController::class);
Route::post('todos/{todo}/upload', [TodoController::class, 'uploadFile']);