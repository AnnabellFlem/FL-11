const email = prompt("Enter your email", '');

if(!email) {
    alert("Canceled.");
} else if (email.length < 6) {
    alert("I don't know any emails having name length less than 6 symbols");
}

const pswd = "";
if (email === "user@gmail.com" || email === "admin@gmail.com") {
    pswd = prompt("Enter your password", '');
} else {
    alert("I don’t know you");
}

if(!pswd) {
    alert("Canceled.");
} else if (email === "user@gmail.com" &&  pswd === "UserPass" || 
            email === "admin@gmail.com" &&  pswd === "AdminPass") {
    alert("Welcome.");
} else {
    alert("Wrong password");
}

const isChangePassword = confirm("Do you want to change your password?");

const oldPassword = "";
const newPassword = "";
if (isChangePassword) {
    oldPassword = prompt("Enter your old password", '');
    if (email === "user@gmail.com" &&  oldPassword === "UserPass" || 
            email === "admin@gmail.com" &&  oldPassword === "AdminPass") {
        newPassword = prompt("Enter your new password", '');
    } else {
        alert("You have failed the change.");
    }
}

const repeatPassword = "";
if (newPassword.length < 5) {
    alert("It’s too short password. Sorry.");
} else {
    repeatPassword = prompt("Enter your new password again", '');
    if (repeatPassword === newPassword) {
        alert("You wrote the wrong password.");
    }   else {
        alert("You have successfully changed your password.");
    }
}