<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\dummy;
use App\Http\Controllers\JobController;
use App\Http\Controllers\SAController;
use Illuminate\Support\Facades\Route;

// Public
Route::post('register', [AuthController::class, 'register']);
Route::post('recruiter-register', [AuthController::class, 'recruiterRegister']);
Route::post('login', [AuthController::class, 'login']);
Route::post('recruiter-login', [AuthController::class, 'recruiter_login']);

// Protected
Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    

    // Admin-only routes
Route::middleware('admin')->group(function () {
    // Dashboard
    Route::get('admin/dashboard', function () {
        return response()->json(['message' => 'Welcome Admin']);
    });

   
});

   // Super Admin only routes
  
    Route::get('super-admin/dashboard', function () {
        return response()->json(['message' => 'Welcome Super Admin']);
    });

  
    Route::get('recruiters', [SAController::class, 'view_recruiters']);
    Route::patch('recruiters/{id}/toggle-activation', [SAController::class, 'toggleActivation']);
    
    Route::get('users',[SAController::class,'users']);

    Route::get('user-details', [SAController::class, 'getUserDetails']);
    Route::post('user-details', [SAController::class, 'storeOrUpdate']);

    Route::post('logout', [AuthController::class, 'logout']);

    
    // Job management
    Route::get('jobs', [JobController::class, 'index']);            // List all jobs
    Route::post('jobs', [JobController::class, 'store']); 
    Route::get('jobs/{id}', [JobController::class, 'show']);          // Create a new job
    Route::patch('jobs/{id}/archive', [JobController::class, 'archive']); // Archive a job
    Route::get('user/jobs', [JobController::class, 'user_jobs']); 
    Route::get('/user/stats', [JobController::class, 'stats']);           // List all jobs
    //Admin
    Route::get('company-details', [AdminController::class, 'getDetails']);
    Route::post('company-details', [AdminController::class, 'storeOrUpdate']);
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::get('/sadashboard/stats', [SAController::class, 'stats']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);
    Route::put('/jobs/{id}', [JobController::class, 'update']);

    Route::post('/jobs/{job}/apply', [JobController::class, 'apply']);
Route::get('/jobs/{jobId}/applications', [JobController::class, 'listApplications']); // for company
Route::patch('/applications/{application}/status', [JobController::class, 'status']);
Route::get('/user/applied-jobs', [JobController::class, 'appliedJobs']);
Route::get('/applications/shortlisted', [JobController::class, 'shortlistedCandidates']);


});
