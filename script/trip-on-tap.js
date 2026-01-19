const modalHTML = `
    <div id="modal" class="modal">
    <div class="modal-content">
        <h3>TripOnTap says</h3>
        <p id="modalMessage"></p>
        <button onclick="closeModal()">OK</button>
    </div>
    </div>
`;

document.body.insertAdjacentHTML("beforeend", modalHTML);

function showModal(message) {
    document.getElementById("modalMessage").innerText = message;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}
const forms = [];

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhone(phone) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
}

function checkFields(fields, i, j) {
    let firstInvalidField = null;

    fields.forEach(field => {
        if (!field.value && !firstInvalidField) {
            firstInvalidField = field;
        }
    });

    if (firstInvalidField) {
        showModal("Please fill all fields");
        firstInvalidField.focus();
        return false;
    }

    if (!isValidEmail(fields[i].value)) {
        showModal("Please enter a valid email address");
        fields[i].focus();
        return false;
    }

    if (!isValidPhone(fields[j].value)) {
        showModal("Please enter a valid phone number (10 digits)");
        fields[j].focus();
        return false;
    }

    return true;
}

function addForm() {
    const fields = [
        document.querySelector('.js-name'),
        document.querySelector('.js-email'),
        document.querySelector('.js-select'),
        document.querySelector('.js-date'),
        document.querySelector('.js-travellers'),
        document.querySelector('.js-age'),
        document.querySelector('.js-phone'),
        document.querySelector('.js-address'),
        document.querySelector('.js-comments')
    ];

    if (!checkFields(fields, 1, 6)) return;

    const form = {
        name: fields[0].value,
        email: fields[1].value,
        destination: fields[2].value,
        date: fields[3].value,
        travellers: fields[4].value,
        age: fields[5].value,
        phone: fields[6].value,
        address: fields[7].value,
        comments: fields[8].value
    };

    forms.push(form);
    console.log(form);
    showModal("Form submitted successfully! Our team will contact you soon.");
    fields.forEach(field => field.value = "");
}

function closeAllPackageModals() {
    const modals = document.querySelectorAll('.package_itinerary_modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}
function openKedarnathModal() {
    closeAllPackageModals();
    document.querySelector('.js-kedarnath-modal').style.display = 'block';
}
function openOotyModal() {
    closeAllPackageModals();
    document.querySelector('.js-ooty-modal').style.display = 'block';
}
function openMadhyaPradeshModal() {
    closeAllPackageModals();
    document.querySelector('.js-madhya-pradesh-modal').style.display = 'block';
}
function openBaliModal() {
    closeAllPackageModals();
    document.querySelector('.js-bali-modal').style.display = 'block';
}
function openDubaiModal() {
    closeAllPackageModals();
    document.querySelector('.js-dubai-modal').style.display = 'block';
}

function addPackageForm() {
    const fields = [
        document.querySelector('.js-name-pkg'),
        document.querySelector('.js-age-pkg'),
        document.querySelector('.js-email-pkg'),
        document.querySelector('.js-phone-pkg'),
        document.querySelector('.js-address-pkg'),
        document.querySelector('.js-travellers-pkg'),
        document.querySelector('.js-comments-pkg')
    ];

    if (!checkFields(fields, 2, 3)) return;

    const form = {
        name: fields[0].value,
        age: fields[1].value,
        email: fields[2].value,
        phone: fields[3].value,
        address: fields[4].value,
        travellers: fields[5].value,
        comments: fields[6].value
    };
    forms.push(form);
    console.log(form);
    showModal("Package inquiry submitted successfully! Our team will contact you soon.");
    fields.forEach(field => field.value = "");
}