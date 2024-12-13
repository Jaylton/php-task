@extends('layouts.app')

@section('page_links')
<link rel="stylesheet" href="{{ mix('css/home.css') }}" />
@endsection

@section('content')
<div class="container" id="home-page">
    <table class="table" id="users-table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Data de criação</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
@endsection

@section('page_scripts')
<script type="text/javascript" src="{{ asset('js/home.js') }}"></script>
@endsection