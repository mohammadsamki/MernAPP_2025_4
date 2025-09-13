var loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault()
    var email = document.getElementById('form2Example1').value;
    var password = document.getElementById('form2Example2').value;
    try {
        console.log(email, password)
        var res = await fetch("http://localhost:5004/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        console.log(res)
        if(res.status === 200){
            alert("Login successful");
            // redirect to profile page
            window.location.href = "dashboard.html"; // Adjust the path as needed
            // save token to local storage
            var data = await res.json();
            localStorage.setItem('token', data.token);
        }
        else {
            alert("Login failed. Please check your credentials.");
        }
        
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
        
    }
})