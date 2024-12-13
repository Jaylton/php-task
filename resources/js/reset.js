import AuthService from "./services/AuthService";
import helpers from "./utilities/helpers";
import Swal from "sweetalert2";

$(document).ready(function () {

    $('#reset-password').on('submit', function (event) {
        event.preventDefault();

        const payload = helpers.arraySerialize($(this).serializeArray());

        AuthService.resetPassword(payload).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    window.location.href = '/login';
                });
            } else {
                Swal.fire({
                    title: 'Erro',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });
});