<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\TodoReorder;
use Illuminate\Support\Facades\Route;

Route::apiResource('todos', TodoController::class);

Route::post('/todos/reorder', TodoReorder::class);
