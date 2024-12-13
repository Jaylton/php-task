import Swal from "sweetalert2";
import AuthService from "./services/AuthService";
import helpers from "./utilities/helpers";

$(document).ready(function () {

    $('#login-form').on('submit', function (event) {
        event.preventDefault();

        const payload = helpers.arraySerialize($(this).serializeArray());

        AuthService.login(payload).then(response => {
            if (response.data.user) {
                localStorage.setItem('accessToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.href = '/home';
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

    $('#reset-password').on('click', function () {
        Swal.fire({
            title: 'Informe seu e-mail',
            input: 'email',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                return AuthService.forgotPassword(email).then(response => {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        Swal.showValidationMessage(
                            `Request failed: ${response.message}`
                        );
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Sucesso',
                    text: result.value.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });
});