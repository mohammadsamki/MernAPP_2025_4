
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
var createProductForm = document.getElementById('createProductForm');
createProductForm.addEventListener('submit', async function(e){
    e.preventDefault()
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var price = document.getElementById('price').value;
    var category = document.getElementById('category').value;
    var imageUrl = document.getElementById('imageUrl').value;
    var token = localStorage.getItem('token');

    try {
        var res = await fetch("http://localhost:5004/api/products/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            },
            body: JSON.stringify({
                name,
                description,
                price,
                category,
                imageUrl
            })
        })
        if (res.status === 201) {
            var data = await res.json();
            console.log('Product created successfully:', data);
            loadProducts();
            // Optionally, redirect or update the UI
        } else {
            console.error('Error creating product:', res.statusText);
        }
    } catch (error) {
        console.error('Error creating product:', error);
    }
})
var productsBody = document.getElementById('productsBody');
async function loadProducts() {
    const token = localStorage.getItem('token');
    try {
        var res = await fetch("http://localhost:5004/api/products/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            var data = await res.json();
            console.log(data)
            renderProducts(data);
        } else {
            console.error('Error fetching products:', res.statusText);
        }

    } catch (error) {
        console.error('Error fetching products:', error);

    }


}
loadProducts();
function renderProducts(products) {
    productsBody.innerHTML = '';
    products.forEach(product => {
        var tr = document.createElement('tr');
        console.log(product)
        // if category is populated then show category name else show category id
        if(product.category && product.category.name){
            product.category = product.category.name;
            // fetch api with get cat by id 
            // res = prod.category
        }
        else{
            product.category = product.category;
        }
        tr.innerHTML = `
            <td>${product._id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}" width="50"/></td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn" data-id="${product._id}">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${product._id}">Delete</button>
            </td>
        `;
        productsBody.appendChild(tr);
    });
    // Attach event listeners to edit and delete buttons
}
// function to get all categories and populate the category select dropdown
async function loadCategoriesForProduct() {
    try {
        var res = await fetch("http://localhost:5004/api/categories/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            var data = await res.json();
            var categorySelect = document.getElementById('category');
            data.forEach(category => {
                var option = document.createElement('option');
                option.value = category._id;
                option.text = category.name;
                categorySelect.appendChild(option);
            });
        } else {
            console.error('Error fetching categories:', res.statusText);
        }
        
    } catch (error) {
        console.error('Error fetching categories:', error);
        
    }
}
loadCategoriesForProduct();