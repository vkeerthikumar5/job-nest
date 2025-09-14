<?php
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome'); 
})->where('any', '^(?!api).*$'); // ignore any route starting with "api"
