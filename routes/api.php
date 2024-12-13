<?php

use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\SendResetPasswordLinkController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\GetAddressByCepController;
use App\Http\Controllers\Api\GetUsersController;

Route::post('/register', RegisterController::class)->name('api.register');
Route::post('/login', LoginController::class)->name('api.login');
Route::post('/forgot-password', SendResetPasswordLinkController::class)->name('api.forgot-password');
Route::post('/reset-password', ResetPasswordController::class)->name('api.reset-password');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', GetUsersController::class);
});

Route::get('/buscar-endereco/{cep}', GetAddressByCepController::class);