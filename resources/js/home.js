import UserService from './services/UserService';

$(document).ready(function () {
    UserService.getUsers().then(response => {
        if (response.data.users) {
            const users = response.data.users;
            users.forEach(user => {
                $('#users-table tbody').append(`
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.created_at}</td>
                    </tr>
                `);
            });
        }
    });
});

