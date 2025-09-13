async function profileLoad (){
    var token = localStorage.getItem('token');
    if (!token){
        alert("Not Login, please login");
        window.location.href = "login.html"; // Adjust the path as needed
        return;
    }
    try {
        var res = await fetch ("http://localhost:5004/api/users/profile", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            }
        })
        if(res.status === 200){
            var data = await res.json()
            document.getElementById('username').innerText = data.username;
            document.getElementById('email').innerText = data.email;
            document.getElementById('role').innerText = data.role;
        }
        else{
            alert("Failed to load profile. Please login again.");
            window.location.href = "login.html"; // Adjust the path as needed
            return;
        }

        
    } catch (error) {
        console.error('Error loading profile:', error);
        alert('Failed to load profile. Please try again.');
        
    }
}
profileLoad();
var logout = document.getElementById('logout');
logout.addEventListener('click', function(){
    localStorage.removeItem('token');
    window.location.href = "login.html"; // Adjust the path as needed
})
var editProfileButton = document.getElementById('editProfile');
editProfileButton.addEventListener('submit', async function(e){
    e.preventDefault()
    var editUsername = document.getElementById('editUsername').value;
    var editEmail = document.getElementById('editEmail').value;
    var token = localStorage.getItem('token');
    try {
        var res = await fetch("http://localhost:5004/api/users/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            },
            body: JSON.stringify({ username: editUsername, email: editEmail })
        })
        console.log(res)
        if(res.status === 200){
            alert("Profile updated successfully");
            profileLoad();
        }
        else{
            alert("Profile update failed. Please try again.");
        }
        
    } catch (error) {
        console.error('Error during profile update:', error);
        alert('Profile update failed. Please try again.');
        
    }

})
var editPassword = document.getElementById('editPassword');
editPassword.addEventListener('submit', async function(e){
    e.preventDefault();
    var oldPassword = document.getElementById('oldPassword').value;
    var newPassword = document.getElementById('newPassword').value;

    var token = localStorage.getItem('token');
    try {
        var res = await fetch("http://localhost:5004/api/users/editPassword", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            },
            body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
        })
        console.log(res)
        if(res.status === 200){
            alert("Password changed successfully");
            // Optionally, log the user out after password change
            localStorage.removeItem('token');
            window.location.href = "login.html"; // Adjust the path as needed
        }
        else{
            alert("Password change failed. Please check your old password and try again.");
        }
        
    } catch (error) {
        console.error('Error during password change:', error);
        alert('Password change failed. Please try again.');
        return;
        
    }
})