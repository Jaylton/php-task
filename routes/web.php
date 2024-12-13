<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return view('auth.login');
})->name('login');
Route::get('/register', function () {
    return view('auth.register');
})->name('register');
Route::get('/forgot-password', function () {
    return view('auth.forgot-password');
})->name('forgot-password');
Route::get('/reset-password', function (Request $request) {
    return view('auth.passwords.reset', ['token' => $request->token, 'email' => $request->email]);
})->name('password.reset');


Route::redirect('/', '/home');

// Route::middleware('auth:sanctum')->group(function () {
    Route::get('/home', function () {
        return view('home');
    })->name('home');
// });