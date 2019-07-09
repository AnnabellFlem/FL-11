const email = prompt('Enter your email', '');

if (!email) {
    alert('Canceled.');
} else if (email.length < 6) {
    alert("I don't know any emails having name length less than 6 symbols");
} else {
    let pswd = '';
    if (email === 'user@gmail.com' || email === 'admin@gmail.com') {
        pswd = prompt('Enter your password', '');
        if (!pswd) {
            alert('Canceled.');
        } else if (email === 'user@gmail.com' && pswd === 'UserPass' ||
            email === 'admin@gmail.com' && pswd === 'AdminPass') {
            alert('Welcome.');
            const isChangePassword = confirm('Do you want to change your password?');
            let oldPassword = '';
            let newPassword = '';
            if (isChangePassword) {
                oldPassword = prompt('Enter your old password', '');
                if (email === 'user@gmail.com' && oldPassword === 'UserPass' ||
                    email === 'admin@gmail.com' && oldPassword === 'AdminPass') {
                    newPassword = prompt('Enter your new password', '');
                    let repeatPassword = '';
                    if (newPassword.length < 5) {
                        alert('It’s too short password. Sorry.');
                    } else {
                        repeatPassword = prompt('Enter your new password again', '');
                        if (repeatPassword === newPassword) {
                            alert('You have successfully changed your password.');
                        } else {
                            alert('You wrote the wrong password.');
                        }
                    }
                } else {
                    alert('Wrong password');
                }
            } else {
                alert('You have failed the change.');
            }
        } else {
            alert('Wrong password');
        }
    } else {
        alert('I don’t know you');
    }
}