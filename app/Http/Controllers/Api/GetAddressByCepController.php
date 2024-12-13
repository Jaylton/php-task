<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class GetAddressByCepController extends Controller
{
    public function __invoke($cep)
    {
        try {
            $endereco = app('CepService')->buscarEndereco($cep);
            return response()->json($endereco);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}