<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class Dummy extends Controller
{
    public function index(){

        $info=User::all();
        return response()->json(["info"=>$info]);
    }
}
