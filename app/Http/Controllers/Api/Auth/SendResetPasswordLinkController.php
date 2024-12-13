<?php

namespace App\Http\Controllers\Api\Auth;

use App\Events\PasswordResetRequested;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class SendResetPasswordLinkController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        
        $user = User::where('email', $request->email)->first(); 
        if ($user) { 
            PasswordResetRequested::dispatch($user->email);
        }

        return response()->json(['message' => 'Se o email existir, um link de redefinição de senha será enviado.'], 200);
    }

}