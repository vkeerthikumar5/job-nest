<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register
    public function register(Request $request) {
        $request->validate([
            'name'              => 'required|string|max:255',
            'email'             => 'required|email|unique:users',
            'password'          => 'required|min:6',
            'role'              => 'required|in:user,admin',
            
            'contact_number'    => 'nullable|string|max:20',
        ]);
    
        $user = User::create([
            'name'             => $request->name,
            'email'            => $request->email,
            'role'             => $request->role, 
            'password'         => Hash::make($request->password),
            
            'contact_number'   => $request->contact_number,
             
        ]);
    }
    
    //Recruiter Registration
    public function recruiterRegister(Request $request) {
        $request->validate([
            'name'              => 'required|string|max:255',
            'email'             => 'required|email|unique:companies',
            'password'          => 'required|min:6',
            'address'           => 'required|string|max:500',
            'established_year'  => 'nullable|integer|min:1800|max:' . date('Y'),
            'website'           => 'nullable|url',
            'contact_number'    => 'nullable|string|max:20',
        ]);
    
        $company = Company::create([
            'name'             => $request->name,
            'email'            => $request->email,
            'role'             => 'admin', // recruiter role
            'password'         => Hash::make($request->password),
            'address'  => $request->address,
            'established_year' => $request->established_year,
            'website'  => $request->website,
            'contact_number'   => $request->contact_number,
            'is_active'        => false, // inactive by default
        ]);
    
        return response()->json([
            'message' => 'Recruiter registered successfully',
            'company' => $company
        ]);
    }
    // Login
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        // Check if admin account is active
        if ($user->role === 'admin' && !$user->is_active) {
            return response()->json([
                'message' => 'Your account is pending activation by the super admin.'
            ], 403);
        }
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $user->role,
            'name' => $user->name,
        ]);
    }
    
    public function recruiter_login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = Company::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        // Check if admin account is active
        if (!$user->is_active) {
            return response()->json([
                'message' => 'Your account is pending activation by the super admin.'
            ], 403);
        }
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $user->role,
            'name' => $user->name,
        ]);
    }

    // Logout
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    // Get profile (protected)
    public function me(Request $request) {
        return $request->user();
    }

    public function index()
    {
        $recruiters = User::all();
        return response()->json($recruiters);
    }
    
        
        public function toggleActivation($id) {
            $user = User::findOrFail($id);
            $user->is_active = !$user->is_active;
            $user->save();
        
            return response()->json($user);
        }
        
}
