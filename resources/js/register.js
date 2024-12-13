import AuthService from "./services/AuthService";
import helpers from "./utilities/helpers";
import Swal from "sweetalert2";

$(document).ready(function () {

    $('#register-form').on('submit', function (event) {
        event.preventDefault();

        const payload = helpers.arraySerialize($(this).serializeArray());

        AuthService.register(payload).then(response => {
            if (response.data.user) {
                localStorage.setItem('accessToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                Swal.fire({
                    title: 'Success',
                    text: 'User registered successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    window.location.href = '/home';
                });
            } else {
                Swal.fire({
                    title: 'Erro',
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });

    $('#zip_code').on('blur', function () {
        const cep = $(this).val().replace(/[^0-9]/g, ''); // Remove caracteres não numéricos

        if (cep.length === 8) {
            $.ajax({
                url: `/api/buscar-endereco/${cep}`,
                method: 'GET',
                success: function (data) {
                    $('#street').val(data.logradouro);
                    $('#neighborhood').val(data.bairro);
                    $('#city').val(data.localidade);
                    $('#state').val(data.uf);
                },
                error: function () {
                    Swal.fire({
                        title: 'Erro',
                        text: 'CEP não encontrado ou inválido.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        } else {
            Swal.fire({
                title: 'Erro',
                text: 'Informe um CEP válido.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });
});