<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Job;
use App\Models\Application;

class AdminController extends Controller
{
    public function getDetails()
    {
        return response()->json(Auth::user());
    }

    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'established_year' => 'nullable|integer',
            'website' => 'nullable|url',
        ]);

        $company = Company::find(Auth::id());
        $company->update($request->only([
            'name', 'contact_number', 'address', 'established_year', 'website'
        ]));

        return response()->json(['message' => 'Company details updated successfully']);
    }
    





    public function stats()
    {
        $company = Auth::user(); // logged-in recruiter (Company)

        

        $totalJobs = Job::where('company_id', $company->id)->count();
        $activeJobs = Job::where('company_id', $company->id)
                        ->where('status', '!=', 'archived')
                        ->count();
        $applications = Job::where('company_id', $company->id)
                        ->withCount('applications')
                        ->get()
                        ->sum('applications_count');

        return response()->json([
            'total_jobs' => $totalJobs,
            'active_jobs' => $activeJobs,
            'total_applications' => $applications,
        ]);
    }
}


