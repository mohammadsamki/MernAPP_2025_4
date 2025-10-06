async function fetchData() {
    const response = await fetch('http://localhost:5004/api/products/all');
    const data = await response.json();
    console.log(data);
    renderData(data)
}
fetchData()

function renderData(data){
    if (!data || data.length === 0) {
        document.getElementById('main').innerHTML = '<p>No products available.</p>';
        return;
    }
    var mainDiv = document.getElementById('main');
    mainDiv.innerHTML = '';
    data.forEach(product => {
        var card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem';
        card.innerHTML = `
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Price: $${product.price}</p>
                <a href="#" class="btn btn-primary">Buy Now</a>
            </div>
        `;
        mainDiv.appendChild(card);
    });
}
async function loadCategories() {
    const response = await fetch('http://localhost:5004/api/categories/all');
    const categories = await response.json();
    const categorySelect = document.getElementById('categorySelect');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category._id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}
loadCategories();
var categorySelect = document.getElementById('categorySelect');
categorySelect.addEventListener('change', async function() {
    var selectedCategory = categorySelect.value;
    console.log(selectedCategory);
    if (selectedCategory === 'all') {
        fetchData();
        return;
    }
    try {

    const response = await fetch('http://localhost:5004/api/products/all');
    const data = await response.json();
    console.log(data);
    //  if category id matches selectedCategory then show else hide
    //  return only the prod that have category._id
    var prodWithCat = data.filter(prod => prod.category && prod.category._id === selectedCategory);
    var filteredData = prodWithCat.filter(product => product.category._id === selectedCategory);
    console.log(filteredData);
    renderData(filteredData)
    } catch (error) {
        console.error('Error fetching products by category:', error);
        
    }
});