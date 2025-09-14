<?php
namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Application;
class JobController extends Controller
{
    // Create Job
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'desc' =>'required|string',
            'skills' => 'required|string',
            'package' => 'required|string',
            'mode' => 'required|in:On-site,Remote,Hybrid',
            'location' => 'required|string|max:255',
            'timings' => 'required|string|max:255',
        ]);

        $job = Job::create([
            'company_id' => Auth::id(), // logged-in recruiter
            'title' => $request->title,
            'desc'=>$request->desc,
            'skills' => $request->skills,
            'package' => $request->package,
            'mode' => $request->mode,
            'location' => $request->location,
            'timings' => $request->timings,
            'status' => 'active',
        ]);

        return response()->json(['message' => 'Job posted successfully', 'job' => $job], 201);
    }

    // List Jobs
    public function index()
    {
        $jobs = Job::where('company_id', Auth::id())
                    ->orderBy('created_at', 'desc')
                    ->get();
        return response()->json($jobs);
    }

    
    

    
    // Archive Job
    // Toggle Archive/Activate
    public function archive(Request $request, $id)
    {
        $job = Job::findOrFail($id);
    
        $action = $request->input('action', 'archive'); // default to archive
        $job->status = $action === 'archive' ? 'archived' : 'active';
        $job->save();
    
        return response()->json([
            'message' => "Job {$action}d successfully",
            'job' => $job
        ]);
    }
    
    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
    
        return response()->json(['message' => 'Job deleted successfully']);
    }
    


    // Show a single job
public function show($id)
{
    $job = Job::where('company_id', Auth::id())->findOrFail($id);
    return response()->json($job);
}
public function update(Request $request, $id)
{
    // Validate input
    $request->validate([
        'title' => 'required|string|max:255',
        'desc' => 'required|string',
        'skills' => 'required|string',
        'package' => 'required|string',
        'mode' => 'required|string',
        'location' => 'required|string',
        'timings' => 'required|string',
    ]);

    // Find the job
    $job = Job::find($id);

    if (!$job) {
        return response()->json(['message' => 'Job not found'], 404);
    }

    // Check if the logged-in company owns this job (optional)
    if ($job->company_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // Update the job
    $job->update($request->only([
        'title', 'desc', 'skills', 'package', 'mode', 'location', 'timings'
    ]));

    return response()->json(['message' => 'Job updated successfully', 'job' => $job]);
}
public function user_jobs()
{
    $userId = Auth::id(); // current logged-in user

    $jobs = Job::with('company')
        ->whereDoesntHave('applications', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->where('status', 'active') // optional: only active jobs
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($jobs);
}

// Apply for a job
public function apply(Request $request, Job $job)
{
    $userId = auth()->id(); // assuming JWT or Sanctum

    // prevent duplicate application
    $exists = Application::where('job_id', $job->id)
                         ->where('user_id', $userId)
                         ->exists();
    if ($exists) {
        return response()->json(['message' => 'Already applied'], 400);
    }

    $application = Application::create([
        'job_id' => $job->id,
        'user_id' => $userId,
    ]);

    return response()->json($application, 201);
}

// List all applications for a job (for company)
public function listApplications($jobId)
{
    $job = Job::findOrFail($jobId);
    $applications = $job->applications()->with('user')->get();

    return response()->json([
        'job' => $job,
        'applications' => $applications,
    ]);
}


// Mark shortlisted
public function status(Application $application, Request $request)
{
    // Validate incoming status
    $request->validate([
        'status' => 'required|in:Applied,Shortlisted,Rejected',
    ]);

    // Update status dynamically
    $application->update([
        'status' => $request->status,
    ]);

    return response()->json([
        'message' => ucfirst($request->status) . ' successfully',
        'application' => $application
    ]);
}


public function appliedJobs()
{
    $userId = auth()->id();

    $applications = Application::with(['job.company'])
        ->where('user_id', $userId)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($applications);
}

public function shortlistedCandidates(Request $request)
{
    $companyId = Auth::id(); // assuming Auth user is company

    // Fetch all applications with status 'Shortlisted' for jobs posted by this company
    $applications = Application::with('user', 'job')
        ->whereHas('job', function($query) use ($companyId) {
            $query->where('company_id', $companyId);
        })
        ->where('status', 'Shortlisted')
        ->get();

    return response()->json($applications);
}

public function stats()
{
    $user = Auth::user(); // logged-in user

    // total jobs in the portal
    $totalJobs = Job::count();

    // total jobs applied by this user
    $appliedJobs = $user->applications()->count();

    return response()->json([
        'total_jobs' => $totalJobs,
        'applied_jobs' => $appliedJobs,
    ]);
}

}
