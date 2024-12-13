<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\Device;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Route;

class Authenticate extends Middleware
{

	public function handle($request, Closure $next, ...$guards)
	{
		$this->authenticate($request, $guards);

		return $next($request);
	}

	/**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {

            return route('login');
        }
    }
}
