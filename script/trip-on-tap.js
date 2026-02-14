document.addEventListener("DOMContentLoaded", function () {
    const element = document.getElementById("animatedText");
    const text = element.innerText;
    element.innerText = "";


    let index = 0;

    function typeLoop() {
        if (index <= text.length) {
            element.innerText = text.slice(0, index);
            index++;
            setTimeout(typeLoop, 200);  // typing speed
        } else {
            setTimeout(() => {
                element.innerText = "";
                index = 0;
                typeLoop();
            }, 500); // pause before clearing
        }
    }

    typeLoop();
});

const modalHTML = `
    <div id="modal" class="modal">
    <div class="modal-content">
        <h3>TripOnTap says...</h3>
        <p id="modalMessage"></p>
        <button type="button" onclick="closeModal()">OK</button>
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
const forms = JSON.parse(localStorage.getItem("tripForms")) || [];

function saveForms() {
    localStorage.setItem("tripForms", JSON.stringify(forms));
}

function renderForms() {
    const container = document.querySelector('.js-your-trips-content');
    if (!container) return;

    if (forms.length === 0) {
        container.innerHTML = "<p>No trips saved yet.</p>";
        return;
    }

    let html = "";

    forms.forEach((form, index) => {
        html += `
            <div class="trip-card">
                <h3>Trip ${index + 1}</h3>

                <p><strong>Form Type: &nbsp;</strong>${form.FormType}</p>
                <p><strong>Name: &nbsp;</strong> ${form.Name}</p>
                <p><strong>Email: &nbsp;</strong> ${form.Email}</p>
                <p><strong>Destination: &nbsp;</strong> ${form.Destination}</p>
                <p><strong>Travel Date: &nbsp;</strong> ${form["Travel Date"] || "-"}</p>
                <p><strong>Number of Travelers: &nbsp;</strong> ${form["Number of Travellers"]}</p>
                <p><strong>Age: &nbsp;</strong> ${form.Age}</p>
                <p><strong>Phone: &nbsp;</strong> ${form.Phone}</p>
                <p><strong>Address: &nbsp;</strong> ${form.Address}</p>
                <p><strong>Message: &nbsp;</strong> ${form.Message}</p>
                <p><strong>Saved On: &nbsp;</strong> ${form["Saved On"]}</p>
                <button class="delete-form-btn" onclick="deleteTrip(${index})">
                    Delete Trip
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
}

function deleteTrip(index) {
    const confirmDelete = confirm("Are you sure you want to delete this trip?");
    if (!confirmDelete) return;

    forms.splice(index, 1);   // remove 1 item at position index
    saveForms();              // update localStorage
    renderForms();            // re-render UI

    showModal("Trip deleted successfully.");
}



function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhone(phone) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
}

function isValidDate(date) {
    const today = new Date();
    const inputDate = new Date(date);
    return inputDate > today;
}

function checkFields(fields, i, j) {
    let firstInvalidField = null;
    
    fields.forEach(field => {
        if (!field.value && !firstInvalidField) {
            firstInvalidField = field;
        }
    });

    if (firstInvalidField) {
        showModal("Please fill all fields.");
        firstInvalidField.focus();
        return false;
    }
    
    if (!isValidEmail(fields[i].value)) {
        showModal("Please enter a valid email address.");
        fields[i].focus();
        return false;
    }
    
    if (!isValidPhone(fields[j].value)) {
        showModal("Please enter a valid phone number (10 digits).");
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

    if (!isValidDate(fields[3].value)) {
        showModal("Please enter a valid travel date.");
        fields[3].focus();
        return false;
    }
    
    const form = {
        "FormType" : "Plan Your Trip",
        "Name": fields[0].value,
        "Email": fields[1].value,
        "Destination": fields[2].value,
        "Travel Date": fields[3].value,
        "Number of Travellers": fields[4].value,
        "Age": fields[5].value,
        "Phone": fields[6].value,
        "Address": fields[7].value,
        "Message": fields[8].value,
        "Saved On": new Date().toLocaleString()
    };
    
    forms.push(form);
    saveForms();
    renderForms();
    showModal("Form submitted successfully! Our team will contact you soon.");

    fields.forEach(field => field.value = "");
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addForm();
    });
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

function addPackageForm(formElement) {
    const fields = [
        formElement.querySelector('.js-name-pkg'),
        formElement.querySelector('.js-email-pkg'),
        formElement.querySelector('.js-select-pkg'),  
        formElement.querySelector('.js-travellers-pkg'),
        formElement.querySelector('.js-age-pkg'),
        formElement.querySelector('.js-phone-pkg'),
        formElement.querySelector('.js-address-pkg'),
        formElement.querySelector('.js-comments-pkg'),
    ];

    if (!checkFields(fields, 1, 5)) return;

    const form = {
        "FormType": "Package Booking",
        "Name": fields[0].value,
        "Email": fields[1].value,
        "Destination": formElement.querySelector('.package_title').innerText,
        "Travel Date": fields[2].value,
        "Number of Travellers": fields[3].value,
        "Age": fields[4].value,
        "Phone": fields[5].value,
        "Address": fields[6].value,
        "Message": fields[7].value,
        "Saved On": new Date().toLocaleString()
    };
    forms.push(form);
    saveForms();
    renderForms();
    showModal("Package inquiry submitted successfully! Our team will contact you soon.");

    fields.forEach(field => field.value = "");
    formElement.style.display = 'none';
}

document.querySelectorAll('.package_itinerary_modal').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addPackageForm(this);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    renderForms();
});

const search = () => {
    const searchbox = document
        .getElementById("searchDestinations")
        .value.toUpperCase();

    const boxes = Array.from(
        document.querySelectorAll(".destination_box")
    );

    // Filter matching boxes
    const matched = boxes.filter(box => {
        const title = box.querySelector("h3").textContent.toUpperCase();
        const category = box.querySelector(".img_des").textContent.toUpperCase();

        return (
            title.includes(searchbox) ||
            category.includes(searchbox)
        );
    });

    // Show/Hide based on filter result
    boxes.forEach(box => {
        if (matched.includes(box)) {
            box.style.display = "";
        } else {
            box.style.display = "none";
        }
    });
};
