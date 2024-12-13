<?php

if (! function_exists('production')) {
    /**
     * Check if running on a production environment
     *
     * @return bool
     */
    function production(): bool
    {
        return app()->environment('production');
    }
}

if (! function_exists('staging')) {
    /**
     * Check if running on any environment other than production
     *
     * @return bool
     */
    function staging(): bool
    {
        return ! production();
    }
}
