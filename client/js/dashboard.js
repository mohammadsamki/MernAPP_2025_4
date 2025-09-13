
async function getUserRole() {
    const token = localStorage.getItem('token');
    try {
        var res = await fetch("http://localhost:5004/api/users/checkRole", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            }
        })
        if (res.status === 200) {
            var data = await res.json();
            document.getElementById('userRole').innerText = "User Role: " + data.message;
        }
        else if (res.status === 403) {
            window.location.href = "home.html"; // Adjust the path as needed
            return;
        }
        else {
            window.location.href = "login.html"; // Adjust the path as needed
            return;
        }
        
    } catch (error) {
        console.error('Error fetching user role:', error);
        
    }
    
}
getUserRole()

var usersTable = document.getElementById('usersBody');
async function loadUsers() {
    const token = localStorage.getItem('token');
    try {
        var res = await fetch("http://localhost:5004/api/users/allUsers", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            }
        })
        if (res.status === 200) {
            var data = await res.json();
            console.log(data)
            renderUsers(data);
        } else {
            console.error('Error fetching users:', res.statusText);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
function renderUsers(users) {
    usersTable.innerHTML = '';
    users.forEach(user => {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${user._id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="deleteUser('${user._id}')">Delete</button>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showUpdateForm('${user._id}', '${user.username}', '${user.email}', '${user.role}')">Update</button>
            </td>
        `;
        usersTable.appendChild(row);
    });
}
loadUsers()
async function deleteUser(userId) {
    const token = localStorage.getItem('token');
    try {
        var res = await fetch(`http://localhost:5004/api/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            }

        })
        if (res.status === 200) {
            alert("User deleted successfully");
            loadUsers();
        }
        
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
        return;
        
    }
}
var updateUserData = document.getElementById('updateUserData');
async function showUpdateForm(id, username, email, role) {
    console.log(id, username, email, role);
    var userName = document.getElementById('userName');
    var userEmail = document.getElementById('userEmail');
    var userRoleInput = document.getElementById('userRoleInput');
    var userIdInput = document.getElementById('userIdInput');
    userIdInput.value = id;
    userName.value = username;
    userEmail.value = email;
    userRoleInput.value = role;
}
updateUserData.addEventListener('submit', async function (e) {
    e.preventDefault();
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('userEmail').value;
    var userRoleInput = document.getElementById('userRoleInput').value;
    var userIdInput = document.getElementById('userIdInput').value;
    const token = localStorage.getItem('token');
    try {
        var res = await fetch(`http://localhost:5004/api/users/updateById/${userIdInput}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            },
            body: JSON.stringify({
                username: userName,
                email: userEmail,
                role: userRoleInput
            })
        })
        if (res.status === 200) {
            alert("User updated successfully");
            loadUsers();
        }

    } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update user. Please try again.');
        return;
        
    }

})
var addUserForm = document.getElementById('addUserForm');
addUserForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    var userName = document.getElementById('name').value;
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;
    var userRole = document.getElementById('role').value;
    const token = localStorage.getItem('token');
    try {
        var res = await fetch("http://localhost:5004/api/users/adminCreate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            },
            body: JSON.stringify({
                username: userName,
                email: userEmail,
                password: userPassword,
                role: userRole
            })
        })
        if (res.status === 201) {
            alert("User added successfully");
            addUserForm.reset();
            loadUsers();
        } else {
            var data = await res.json();
            alert("Failed to add user: " + data.message);
        }

}
    catch (error) {
        console.error('Error adding user:', error);
        alert('Failed to add user. Please try again.');
        return;
        
    }
}
);
