// Sourced from Lab14, specfically Ex4 

var express = require('express');
var myParser = require("body-parser");
var fs = require('fs');
const queryString = require("querystring");
var filename = 'user_data.json';
var qs = require('querystring');



var express = require('express');
var app = express();
app.use(myParser.urlencoded({ extended: true })); 
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});



//check to see if the file esists
if (fs.existsSync(filename)) {
    userid = fs.readFileSync(filename, 'utf-8');

    users_reg_data = JSON.parse(userid); //  Takes a string and converts it into object or array

   // console.log(users_reg_data);
} else {
    console.log(filename + ' does not exist!');
}



//sourced from Professor Port , Lab 14
app.post("/login_form", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    var theQuantityQueryString = queryString.stringify(request.query);
    
    submittedUser = request.body.username;
    submittedPass = request.body.password;
    submitted_Username = request.body.username.toLowerCase();


    if (typeof users_reg_data[submitted_Username] != 'undefined') {
        if (users_reg_data[submitted_Username].password == request.body.password) {
            loginFullname = users_reg_data[submitted_Username].name;
            loginEmail = users_reg_data[submitted_Username].email;
            loginUserName = request.body.username;

            request.query.stickFullname = loginFullname;
            request.query.stickEmail = loginEmail;
            request.query.stickUsername = loginUserName;
            theQuantityQueryString = qs.stringify(request.query);
            response.redirect('/game_logined.html?' + theQuantityQueryString); 
            } else if (users_reg_data[submittedUser].password != request.body.password) { // Else if password does not match username in user database
            error = '<font color="red">Incorrect Password</font>'; // Assigns error to html to be displayed
            stickInput = submittedUser; // Assigns inputted username to a sticky variable
            // Puts variables into query
            request.query.LoginError = error;
            request.query.logStickInput = stickInput; 
            }
            } else {
            error = "<font color='red'>Invalid Username: </font>" + submitted_Username; // Assigns error to html to be displayed
            stickInput = submittedUser; // Assigns inputted username to a sticky variable
            // Puts variables into query
            request.query.LoginError = error;
            request.query.logStickInput = stickInput;
            }
            theQuantityQueryString = queryString.stringify(request.query); // String query together
            response.redirect("./login_page.html?" + theQuantityQueryString); // Send back to login page with qString
});
        


app.post("/register_form", function (request, response) {
    var theQuantityQueryString = queryString.stringify(request.query); // String query together
    // Assigns textbox inputs to values
    regInputUser = request.body.username.toLowerCase(); // Assigns the username to lower case for unique names
    regInputFullname = request.body.fullname;
    regInputPassword = request.body.password;
    regInputRepPassword = request.body.repeat_password;
    regInputEmail = request.body.email;
    email = request.body.email.toLowerCase();

    if (regInputFullname.length > 30) { // If full name is over 30 characters
        fullnameErrorReg = '<font color="red">Full Name must be 30 characters or less</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (!(/^[A-Za-z ]+$/.test(regInputFullname))) { // Regular expression; else if the fullname does not equal letters only, source: https://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
        fullnameErrorReg = '<font color="red">Full Name must be letters only</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { // Else there are no errors
        fullnameErrorReg = ''; // No errors are stored in the variable
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if (regInputPassword.length < 6) { //if password the user enters is less than 6 characters
        passwordErrorReg = '<font color="red">Password must be at least six characters</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputRepPassword != regInputPassword) { // Else if the repeat password does not match the password enterd from the user
        passwordErrorReg = '<font color="red">Password DOES NOT Match</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { // Else there are no errors
        passwordErrorReg = ''; // No errors are stored in the variable
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if (typeof users_reg_data[regInputUser] != 'undefined') { // Check if the username is already taken
        usernameErrorReg = '<font color="red">User already registered</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (!(/^[a-zA-Z0-9]+$/.test(regInputUser))) { // If the username does not equal letters and numbers only, source: https://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
        usernameErrorReg = '<font color="red">Username must be characters and numbers only</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputUser.length > 10) { // If the username is greater than 10 characters long
        usernameErrorReg = useLong = '<font color="red">Username must be ten characters or less</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputUser.length < 4) { // If the username is less than 4 characters long
        usernameErrorReg = '<font color="red">Username must be at least four characters</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { // Else there are no errors
        usernameErrorReg = ''; // No errors are stored in the variable
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if (!(/^[a-zA-Z0-9._]+@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/.test(regInputEmail))) { // follows X@Y.Z format; address which can only contain letters, numbers, and the characters “_” and “.”; Y is the host machine which can contain only letters and numbers and “.” characters; Z is the domain name which is either 2 or 3 letters such as “edu” or “tv”
        emailErrorReg = '<font color="red">Email is invalid</font>'; // Assigns error to html to be displayed
        regIncorrectFullName = regInputFullname; // Stores stick input into a variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { // Else there are no errors
        emailErrorReg = ''; // No errors are stored in the variable
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    // If there are no errors stored in each error variable, user is stored in users_reg_data object
    if (fullnameErrorReg == '' && passwordErrorReg == '' && usernameErrorReg == '' && emailErrorReg == '') {
        users_reg_data[regInputUser] = {}; // New user becomes new property of users_reg_data object
        users_reg_data[regInputUser].name = request.body.fullname; // Name entered is stored in users_reg_data object
        users_reg_data[regInputUser].password = request.body.password; // Password entered is stored in users_reg_data object
        users_reg_data[regInputUser].email = request.body.email; // Email entered is stored in users_reg_data object
        fs.writeFileSync(filename, JSON.stringify(users_reg_data)); // Strings data into JSON for users_reg_data

        // Puts variables into query
        request.query.stickFullname = regInputFullname;
        request.query.stickEmail = regInputEmail;
        request.query.stickUsername = regInputUser;
        qString = queryString.stringify(request.query); // String query together
        response.redirect("./game_logined.html?" + qString); // Send to invoice page with query

        console.log(request.body);
    }
    // Retrieve variables and puts them into query; for displaying errors on page
    request.query.RegFullnameError = fullnameErrorReg;
    request.query.RegPasswordError = passwordErrorReg;
    request.query.RegUsernameError = usernameErrorReg;
    request.query.RegEmailError = emailErrorReg;
    
    // Retrieve variables and puts them into query; for sticking user input
    request.query.stickRegFullname = regIncorrectFullName;
    request.query.stickUsername = regIncorrectUsername;
    request.query.stickEmail = regIncorrectEmail;

    qString = queryString.stringify(request.query); // String query together
    response.redirect("./register_page.html?" + qString); // Send to register page with query
});


console.log('test');

app.use(express.static('./public'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });