<?php

use App\Http\Controllers\OwnedController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeenController;
use App\Http\Controllers\SeriesController;
use App\Http\Controllers\SetController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('seen', SeenController::class)
  ->middleware(['auth', 'verified']);

Route::resource('series', SeriesController::class)
  ->only(['index'])
  ->middleware(['auth', 'verified'])
  ->names([
    'index' => 'series.index',
  ]);

Route::resource('set', SetController::class)
  ->only(['show'])
  ->middleware(['auth', 'verified'])
  ->names([
    'show' => 'set.show',
  ]);

Route::resource('owned', OwnedController::class)
  ->only(['index', 'store', 'destroy'])
  ->middleware(['auth', 'verified'])
  ->names([
    'index' => 'owned.index',
    'store' => 'owned.store',
    'destroy' => 'owned.destroy',
  ]);


Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
