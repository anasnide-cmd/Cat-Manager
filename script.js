function generateID() {
    const catData = {
        name: document.getElementById('catName').value,
        dob: document.getElementById('dob').value,
        breed: document.getElementById('breed').value,
        photo: document.getElementById('catPhoto').files[0],
        id: generateUniqueID(),
        chip: generateChipNumber(),
        securityCode: generateSecurityCode(),
        issueDate: new Date().toLocaleDateString(),
        validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toLocaleDateString()
    };

    updateIDCard(catData);
    generateQRCode(catData);
    saveToLocalStorage(catData);
}

function generateUniqueID() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(-4);
    return `CAT-${timestamp}-${random}`;
}

function generateChipNumber() {
    const chip = crypto.getRandomValues(new Uint8Array(6));
    return 'CHIP-' + Array.from(chip, byte => 
        byte.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function generateSecurityCode() {
    return crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(-6).toUpperCase();
}

function updateIDCard(data) {
    document.getElementById('displayId').textContent = data.id;
    document.getElementById('displayName').textContent = data.name;
    document.getElementById('displayDob').textContent = data.dob;
    document.getElementById('displayBreed').textContent = data.breed || '-';
    document.getElementById('displayChip').textContent = data.chip;
    document.getElementById('issueDate').textContent = data.issueDate;
    document.getElementById('validDate').textContent = data.validUntil;
    document.getElementById('securityCode').textContent = data.securityCode;

    if(data.photo) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('catImage').src = e.target.result;
        };
        reader.readAsDataURL(data.photo);
    }
}

function generateQRCode(data) {
    const qrData = JSON.stringify({
        id: data.id,
        chip: data.chip,
        code: data.securityCode
    });
    
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    
    new QRCode(qrContainer, {
        text: qrData,
        width: 150,
        height: 150,
        colorDark: "#2c3e50",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function saveToLocalStorage(data) {
    const existingData = JSON.parse(localStorage.getItem('catRecords') || '[]');
    existingData.push(data);
    localStorage.setItem('catRecords', JSON.stringify(existingData));
}
