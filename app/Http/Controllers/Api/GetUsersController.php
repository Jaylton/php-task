<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class GetUsersController extends Controller
{

    public function __invoke()
    {
        $users = User::all();
        return response()->json(['users'=>$users]);
    }
}
