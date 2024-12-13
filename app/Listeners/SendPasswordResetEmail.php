<?php

namespace App\Listeners;

use App\Events\PasswordResetRequested;
use Illuminate\Support\Facades\Password;

class SendPasswordResetEmail
{
    public function handle(PasswordResetRequested $event)
    {
        $email = $event->email;
        
        Password::sendResetLink(['email'=>$email]);
    }
}

