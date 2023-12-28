// app.js
let staffList = [];

// Load staffList from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const storedStaffList = localStorage.getItem('staffList');
    if (storedStaffList) {
        staffList = JSON.parse(storedStaffList);
        displayStaffInfo();
    }
});

function addStaff() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const qualifications = document.getElementById("qualifications").value;
    const role = document.getElementById("role").value;
    const contact = document.getElementById("contact").value;

    const staffInfo = {
        name,
        age,
        qualifications,
        role,
        contact
    };

    staffList.push(staffInfo);
    displayStaffInfo();
    saveToLocalStorage();
    clearForm();
}

function displayStaffInfo() {
    const staffInfoList = document.getElementById("staffInfoList");
    staffInfoList.innerHTML = '';

    staffList.forEach((staff, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Name:</strong> ${staff.name}<br>
            <strong>Age:</strong> ${staff.age}<br>
            <strong>Qualifications:</strong> ${staff.qualifications}<br>
            <strong>Role:</strong> ${staff.role}<br>
            <strong>Contact:</strong> ${staff.contact}<br>
            <button onclick="editStaff(${index})">Edit</button>
        `;
        staffInfoList.appendChild(li);
    });
}

function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("age").value = '';
    document.getElementById("qualifications").value = '';
    document.getElementById("role").value = '';
    document.getElementById("contact").value = '';
}

function editStaff(index) {
    // Populate the update form with the selected staff's information
    const staff = staffList[index];
    document.getElementById('updateName').value = staff.name;
    document.getElementById('updateAge').value = staff.age;
    document.getElementById('updateQualifications').value = staff.qualifications;
    document.getElementById('updateRole').value = staff.role;
    document.getElementById('updateContact').value = staff.contact;

    // Store the index of the staff being edited
    document.getElementById('updateStaffForm').setAttribute('data-index', index);

    // Display the update form and hide the add form
    document.getElementById('addStaffForm').style.display = 'none';
    document.getElementById('staffList').style.display = 'none';
    document.getElementById('updateStaffForm').style.display = 'block';
}

function updateStaff() {
    // Retrieve the stored index of the staff being edited
    const index = document.getElementById('updateStaffForm').getAttribute('data-index');

    // Update the staffList with the edited information
    const updatedStaff = {
        name: document.getElementById('updateName').value,
        age: document.getElementById('updateAge').value,
        qualifications: document.getElementById('updateQualifications').value,
        role: document.getElementById('updateRole').value,
        contact: document.getElementById('updateContact').value,
    };

    staffList[index] = updatedStaff;

    // Reset the form and display the add form and staff list
    document.getElementById('updateStaffForm').style.display = 'none';
    document.getElementById('addStaffForm').style.display = 'block';

    // Display the updated staff information
    displayStaffInfo();
    
    // Save the updated staffList to localStorage
    saveToLocalStorage();
}

function cancelUpdate() {
    // Reset the form and display the add form and staff list
    document.getElementById('updateStaffForm').style.display = 'none';
    document.getElementById('addStaffForm').style.display = 'block';
    document.getElementById('staffList').style.display = 'block';
}

// Save staffList to localStorage
function saveToLocalStorage() {
    localStorage.setItem('staffList', JSON.stringify(staffList));
}
