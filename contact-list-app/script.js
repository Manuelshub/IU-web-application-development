// ── JSON Data Structure ──
// Contacts are stored as a raw JSON string — plain text representation of the data.
// JSON.parse() is used to convert this string into a live JavaScript array of objects.
const jsonString = `[
    {"name":"Emmanuel Ifediora","email":"emmanuel@example.com","phoneNumber":"+234 801 234 5678"},
    {"name":"Sarah Thompson","email":"sarah.t@example.com","phoneNumber":"+44 7911 123456"},
    {"name":"James Okafor","email":"james.ok@example.com","phoneNumber":"+234 805 987 6543"}
]`;

// JSON.parse() reads the JSON string and converts it into a usable JavaScript array
let contacts = JSON.parse(jsonString);

// render table
// Parses the contacts objects and dynamically populates the HTML table
function renderTable() {
    const tbody = document.getElementById("contact-table-body");
    const countEl = document.getElementById("contact-count");

    countEl.textContent = contacts.length + (contacts.length === 1 ? " contact" : " contacts");

    tbody.innerHTML = "";
    if (contacts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="empty-state">No contacts yet. Add one above.</td>
            </tr>`;
        return;
    }
 
    // Loop through each contact and build a table row
    contacts.forEach(function(contact) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contact.name}</td>
            <td class="email">${contact.email}</td>
            <td>${contact.phoneNumber}</td>
            <td>
                <button class="btn-delete" onclick="removeContact('${contact.name}')">
                    Remove
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Checks that all fields are filled and email is in valid format
function validateInputs(name, email, phone) {
    // Regex pattern — checks for text @ text . text
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !phone) {
        return "All fields are required. Please fill out every field.";
    }

    if (!emailRegex.test(email)) {
        return "Please enter a valid email address (e.g. name@example.com).";
    }

    return null;
}

// Reads form inputs, validates, creates a new contact object, updates the array
function addContact() {
    const nameInput  = document.getElementById("input-name");
    const emailInput = document.getElementById("input-email");
    const phoneInput = document.getElementById("input-phone");
    const errorMsg   = document.getElementById("error-msg");

    const name  = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    // Remove previous error styling
    [nameInput, emailInput, phoneInput].forEach(function(el) {
        el.classList.remove("error");
    });
    errorMsg.textContent = "";

    // Run validation
    const error = validateInputs(name, email, phone);
    if (error) {
        errorMsg.textContent = error;
        // Highlight empty fields in red
        if (!name)  nameInput.classList.add("error");
        if (!email) emailInput.classList.add("error");
        if (!phone) phoneInput.classList.add("error");
        return;
    }

    // Build new contact object and push into the array
    const newContact = { name: name, email: email, phoneNumber: phone };
    contacts.push(newContact);

    // Clear input fields after successful addition
    nameInput.value  = "";
    emailInput.value = "";
    phoneInput.value = "";

    // Re-render the table to reflect the updated array
    renderTable();
}

// Uses array.filter() to create a new array that excludes the deleted contact
function removeContact(name) {
    contacts = contacts.filter(function(contact) {
        return contact.name !== name;
    });
 
    // Re-render the table to reflect the deletion
    renderTable();
}
 
// ── Initial Render ──
// Run on page load to display the sample contacts
renderTable();