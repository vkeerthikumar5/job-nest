<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()->role !== 'super-admin') { // or !== 1 if you’re using numbers
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
