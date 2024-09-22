
        async function fetchProducts() {
            const response = await fetch('/api/products');
            const products = await response.json();
            const productList = document.getElementById('product-list');
            productList.innerHTML = ``;
            products.forEach(product => {               
                const li = document.createElement('li');
                li.textContent = `Name: ${product.name} - Price: ${product.price}rs`;
                li.appendChild(createDeleteButton(product._id));
                li.appendChild(createUpdateButton(product));
                productList.appendChild(li);
            });
        }

        function createDeleteButton(id) {
            const button = document.createElement('button');
            button.textContent = 'Delete';
            button.onclick = async () => {
                await fetch(`/api/products/${id}`, { method: 'DELETE' });
                window.alert('Product deleted Successfully')
                fetchProducts();
            };
            return button;
        }
        
        function createUpdateButton(product) {
            const button = document.createElement('button');
            button.textContent = 'Update';
            button.onclick = () => {
                const newName = prompt("New Name:", product.name);
                const newPrice = prompt("New Price:", product.price);
                if (newName && newPrice) {
                    updateProduct(product._id, { name: newName, price: newPrice });
                }
            };
            return button;
        }
        
        async function updateProduct(id, data) {
            await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            window.alert('Product Updated Successfully')
            fetchProducts();
        }
        
        async function addProduct() {
            const name = document.getElementById('product-name').value;
            const price = document.getElementById('product-price').value;
            if (name && price) {
                await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, price }),
                });
                window.alert('Product Added Successfully')
                fetchProducts();
                document.getElementById('product-name').value = '';
                document.getElementById('product-price').value = '';
            }
        }

        // Fetch products on page load
        fetchProducts();
