<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use App\Models\Job;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SAController extends Controller
{
    // Fetch only admin users
    public function view_recruiters()
{
    $recruiters = Company::where('role', 'admin')
        ->withCount('jobs') // adds jobs_count column
        ->get();

    return response()->json($recruiters);
}


    // Toggle activation status of a recruiter
    public function toggleActivation($id)
    {
        $user = Company::where('role', 'admin')->findOrFail($id); // Only admin users
        $user->is_active = !$user->is_active;
        $user->save();

        return response()->json($user);
    }

    public function users()
    {
        $recruiters = User::where('role', 'user')
            ->withCount('applications') // adds applications_count column
            ->get();
    
        return response()->json($recruiters);
    }
    

    
    // Fetch user details
    public function getUserDetails()
{
    $user = Auth::user();
   
    return response()->json([
        'name' => $user->name,
        'email' => $user->email,
        'contact_number' => $user->contact_number,
        
        'dob' => $user->dob,
        'gender' => $user->gender,
        'address' => $user->address,
        'degree' => $user->degree,
        'specialization' => $user->specialization,
        'college_name' => $user->college_name,
        'graduation_year' => $user->graduation_year,
        'cgpa' => $user->cgpa,
        'skills' => $user->skills,
        'projects' => $user->projects,
        'internships' => $user->internships,
    ], 200);
}

    // Create or Update user details
    public function storeOrUpdate(Request $request)
{
    $user = Auth::user(); // Get the logged-in user

    $request->validate([
        'dob' => 'required|date',
        'contact' => 'required|string',
        'gender' => 'required|string',
        'address' => 'required|string|max:255',
        'degree' => 'nullable|string|max:100',
        'specialization' => 'nullable|string|max:100',
        'college_name' => 'nullable|string|max:255',
        'graduation_year' => 'nullable|integer|min:1900|max:2100',
        'cgpa' => 'nullable|max:10',
        'skills' => 'nullable|string',
        'projects' => 'nullable|string',
        'internships' => 'nullable|string',
    ]);

    // Update the existing user directly
    $user->update([
        'dob' => $request->dob,
        'contact_number' => $request->contact,
        'gender' => $request->gender,
        'address' => $request->address,
        'degree' => $request->degree,
        'specialization' => $request->specialization,
        'college_name' => $request->college_name,
        'graduation_year' => $request->graduation_year,
        'cgpa' => $request->cgpa,
        'skills' => $request->skills,
        'projects' => $request->projects,
        'internships' => $request->internships,
    ]);

    return response()->json([
        'message' => 'User details saved successfully',
        'data' => $user
    ], 200);
}
public function stats()
    {
        $totalUsers = User::count();
        $totalCompanies = Company::count();
        $pendingActivations = Company::where('is_active', false)->count();
        $totalJobs = Job::count();
        $activeJobs = Job::where('status', '!=', 'archived')->count(); // assuming 'archived' is the status
        $totalApplications = Application::count();

        return response()->json([
            'total_users' => $totalUsers-1,
            'total_companies' => $totalCompanies,
            'pending_activations' => $pendingActivations,
            'total_jobs' => $totalJobs,
            'active_jobs' => $activeJobs,
            'total_applications' => $totalApplications,
        ]);
    }

}


