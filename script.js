// Simpan data dalam localStorage
let cats = JSON.parse(localStorage.getItem('cats')) || [];

// Fungsi tambah kucing
document.getElementById('catForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newCat = {
        id: Date.now(),
        name: document.getElementById('catName').value,
        breed: document.getElementById('catBreed').value,
        color: document.getElementById('catColor').value
    };
    
    if(cats.length < 40) {
        cats.push(newCat);
        updateStorage();
        renderCats();
        e.target.reset();
    } else {
        alert('Maximum 40 cats reached!');
    }
});

// Fungsi papar kucing
function renderCats() {
    const container = document.getElementById('catsContainer');
    container.innerHTML = '';
    
    cats.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'cat-card';
        catDiv.innerHTML = `
            <div>
                <h3>${cat.name}</h3>
                <p>Breed: ${cat.breed || '-'}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <div class="cat-color" style="background: ${cat.color}"></div>
                <button onclick="deleteCat(${cat.id})">Delete</button>
            </div>
        `;
        container.appendChild(catDiv);
    });
}

// Fungsi padam kucing
function deleteCat(id) {
    if(confirm('Delete this cat?')) {
        cats = cats.filter(cat => cat.id !== id);
        updateStorage();
        renderCats();
    }
}

// Update localStorage
function updateStorage() {
    localStorage.setItem('cats', JSON.stringify(cats));
}

// Papar data awal
renderCats();
