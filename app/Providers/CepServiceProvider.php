<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Http;

class CepServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton('CepService', function () {
            return new class {
                public function buscarEndereco($cep)
                {
                    $response = Http::get("https://viacep.com.br/ws/$cep/json/");
                    
                    if ($response->failed() || isset($response['erro'])) {
                        throw new \Exception('CEP inválido ou não encontrado.');
                    }

                    return $response->json();
                }
            };
        });
    }

    /**
     * Boot services.
     */
    public function boot()
    {
        //
    }
}
