var createCategoryForm = document.getElementById('createCategoryForm');
createCategoryForm.addEventListener('submit', async function(e){
    e.preventDefault();
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var imageUrl = document.getElementById('imageUrl').value;
    var token = localStorage.getItem('token');
    console.log({ name, description, imageUrl });
    try {
        var res = await fetch("http://localhost:5004/api/categories/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth': token
            },
            body: JSON.stringify({
                name,
                description,
                imageUrl
            })
        })
        if (res.status === 201) {
            var data = await res.json();
            console.log('Category created successfully:', data);
            loadCategories();
            // Optionally, redirect or update the UI
        } else {
            console.error('Error creating category:', res.statusText);
        }
    } catch (error) {
        console.error('Error creating category:', error);
    }
})
var categoriesBody = document.getElementById('categoriesBody');
async function loadCategories() {
    const token = localStorage.getItem('token');
    try {
        var res = await fetch("http://localhost:5004/api/categories/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            var data = await res.json();
            console.log(data)
            renderCategories(data);
        } else {
            console.error('Error fetching categories:', res.statusText);
        }

    } catch (error) {
        console.error('Error fetching categories:', error);

    }
}
function renderCategories(categories) {
    categoriesBody.innerHTML = '';
    categories.forEach(category => {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${category._id}</td>
            <td>${category.name}</td>
            <td>${category.description}</td>
            <td><img src="${category.imageUrl}" alt="${category.name}" width="50"></td>
            <td>
                <button class="editCategory" data-id="${category._id}">Edit</button>
                <button class="deleteCategory" data-id="${category._id}">Delete</button>
            </td>
        `;
        categoriesBody.appendChild(tr);
    });
}
loadCategories();