var form = document.getElementById('registerForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    try {
        var user = {
            username: name,
            email: email,
            password: password
        }
         var res = await fetch("http://localhost:5004/api/users/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                    body: JSON.stringify(user)
        })
        console.log(res)
        if(res.status === 201){
            alert("Registration successful");
            // redirect to login page
            window.location.href = "login.html"; // Adjust the path as needed
        }
        else {
            alert("Registration failed. Please check your credentials.");
        }
        
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
        
    }
})