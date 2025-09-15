<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\SAController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('register', [AuthController::class, 'register']);
Route::post('recruiter-register', [AuthController::class, 'recruiterRegister']);
Route::post('login', [AuthController::class, 'login']);
Route::post('recruiter-login', [AuthController::class, 'recruiter_login']);

// Protected routes (requires auth)
Route::middleware('auth:sanctum')->group(function () {

    // Current user info
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // AdminController
    
    Route::get('company-details', [AdminController::class, 'getDetails']);
    Route::post('company-details', [AdminController::class, 'storeOrUpdate']);
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    

    // Super Admin Controller
  
    Route::get('recruiters', [SAController::class, 'view_recruiters']);
    Route::patch('recruiters/{id}/toggle-activation', [SAController::class, 'toggleActivation']);
    Route::get('users', [SAController::class, 'users']);
    Route::get('user-details', [SAController::class, 'getUserDetails']);
    Route::post('user-details', [SAController::class, 'storeOrUpdate']);
    Route::get('/sadashboard/stats', [SAController::class, 'stats']);
    

    // Job management Controller
    Route::get('jobs', [JobController::class, 'index']);
    Route::post('jobs', [JobController::class, 'store']);
    Route::get('jobs/{id}', [JobController::class, 'show']);
    Route::patch('jobs/{id}/archive', [JobController::class, 'archive']);
    Route::delete('jobs/{id}', [JobController::class, 'destroy']);
    Route::put('jobs/{id}', [JobController::class, 'update']);

    // Job applications (for users and companies)
    Route::post('jobs/{job}/apply', [JobController::class, 'apply']);
    Route::get('jobs/{jobId}/applications', [JobController::class, 'listApplications']);
    Route::patch('applications/{application}/status', [JobController::class, 'status']);
    Route::get('user/applied-jobs', [JobController::class, 'appliedJobs']);
    Route::get('applications/shortlisted', [JobController::class, 'shortlistedCandidates']);

   
    Route::get('/user/stats', [JobController::class, 'stats']);
    Route::get('user/jobs', [JobController::class, 'user_jobs']);
});
