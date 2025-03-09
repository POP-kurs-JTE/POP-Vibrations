// script.js

// Toggle the visibility of the "Add New Device" form
const addDeviceButton = document.getElementById("addDeviceButton");
const newDeviceForm = document.getElementById("newDeviceForm");
const cancelButton = document.getElementById("cancelButton");

addDeviceButton.addEventListener("click", () => {
  newDeviceForm.style.display = "block"; // Show the form
});

cancelButton.addEventListener("click", () => {
  newDeviceForm.style.display = "none"; // Hide the form
});

// Get references to the required elements
const saveButton = document.querySelector('.save-btn');
const deviceTableBody = document.querySelector('.device-table tbody');

// Handle the save button click event
saveButton.addEventListener('click', () => {
  // Get form input values
  const deviceName = document.querySelector('.new-device-form input[placeholder="[ENTER NAME]*"]').value;
  const phoneNumber = document.querySelector('.new-device-form input[placeholder="[NEW DEVICE PHONE NUMBER]*"]').value;
  const userPhoneNumber = document.querySelector('.new-device-form input[placeholder="[USER PHONE NUMBER]*"]').value;

  // Check if required fields are filled
  if (!deviceName || !phoneNumber || !userPhoneNumber) {
    alert('Please fill in all required fields!');
    return;
  }

  // Create a new row for the device table
  const newRow = document.createElement('tr');

  // Add the new device details to the row
  newRow.innerHTML = `
    <td>${deviceName}</td>
    <td class="status pending">PENDING...</td>
    <td>PENDING...</td>
    <td class="operations">
      <button class="icon-btn">📹</button>
      <button class="icon-btn">📊</button>
      <button class="icon-btn">❓</button>
      <button class="icon-btn delete-btn">🗑️</button>
    </td>
  `;

  // Append the new row to the table
  deviceTableBody.appendChild(newRow);

  // Reset the form and hide it
  document.querySelector('.new-device-form input[placeholder="[ENTER NAME]*"]').value = '';
  document.querySelector('.new-device-form input[placeholder="[NEW DEVICE PHONE NUMBER]*"]').value = '';
  document.querySelector('.new-device-form input[placeholder="[USER PHONE NUMBER]*"]').value = '';
  newDeviceForm.style.display = 'none';
});

// Event listener for the delete buttons
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    // Confirm deletion with the user
    const confirmDelete = confirm('Are you sure you want to delete this device?');
    if (confirmDelete) {
      // Find and remove the row containing the clicked delete button
      const rowToDelete = event.target.closest('tr');
      rowToDelete.remove();
    }
  }
});

// Get references to the search bar and table
const searchBar = document.querySelector('.search-bar');
const tableBody = document.querySelector('.device-table tbody');

// Add event listener to the search bar
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase().trim(); // Get the search query, case-insensitive and trimmed
  const rows = tableBody.querySelectorAll('tr'); // Select all table rows
  let hasResults = false;

  rows.forEach(row => {
    const deviceNameCell = row.querySelector('td:first-child'); // Get the first cell (device name)

    // Only check rows that are not placeholders for "No Results"
    if (deviceNameCell) {
      const deviceName = deviceNameCell.textContent.toLowerCase();
      if (deviceName.includes(query)) {
        row.style.display = ''; // Show matching row
        hasResults = true;
      } else {
        row.style.display = 'none'; // Hide non-matching row
      }
    }
  });

  // Handle "No Results" message
  let noResultsRow = document.querySelector('.no-results');
  if (!hasResults) {
    if (!noResultsRow) {
      noResultsRow = document.createElement('tr');
      noResultsRow.classList.add('no-results');
      noResultsRow.innerHTML = `
        <td colspan="4" style="text-align: center; font-style: italic; color: gray;">No results</td>
      `;
      tableBody.appendChild(noResultsRow);
    }
  } else if (noResultsRow) {
    noResultsRow.remove(); // Remove "No Results" if matches are found
  }
});
// Get references to elements
const chooseUserSection = document.getElementById('choose-user-section');
const deviceManagementSection = document.getElementById('device-management-section');
const userSelect = document.getElementById('user-select');
const continueBtn = document.getElementById('continue-btn');
const addUserModal = document.getElementById('add-user-modal');
const newUserInput = document.getElementById('new-user-input');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const save_UserBtn = document.getElementById('save_User-btn');

// Enable the "Continue" button when a user is selected
userSelect.addEventListener('change', () => {
  if (userSelect.value === 'add-new-user') {
    // Open the "Add New User" modal
    addUserModal.style.display = 'flex';
    userSelect.value = ''; // Reset the dropdown
  } else {
    continueBtn.disabled = !userSelect.value;
  }
});

// Handle the "Cancel" button in the modal
cancelBtn.addEventListener('click', () => {
  newUserInput.value = ''; // Clear the input
  addUserModal.style.display = 'none'; // Close the modal
});

// Handle the "Save" button in the modal
save_UserBtn.addEventListener('click', () => {
  const newUserName = newUserInput.value.trim();
  if (newUserName) {
    // Create a new <option> element and add it to the dropdown
    const newOption = document.createElement('option');
    newOption.value = newUserName;
    newOption.textContent = newUserName;
    userSelect.appendChild(newOption);

    // Clear the input and close the modal
    newUserInput.value = '';
    addUserModal.style.display = 'none';
  } else {
    alert('Please enter a valid user name.');
  }
});

// Get reference to the current-user display
const currentUserDisplay = document.getElementById('current-user');

// Handle the "Continue" button click
continueBtn.addEventListener('click', () => {
  if (userSelect.value) {
    // Display the selected user in the "Device Management" section
    currentUserDisplay.textContent = `User: ${userSelect.value}`;

    // Switch sections
    chooseUserSection.style.display = 'none'; // Hide the Choose User section
    deviceManagementSection.style.display = 'block'; // Show the Device Management section
  }
});

document.getElementById('downloadPdfBtn').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add a title for the PDF report
  doc.setFontSize(16);
  doc.text("Sensor Data Report", 20, 20);

  // Add a brief description
  doc.setFontSize(12);
  doc.text("This report provides visualizations for the sensor data collected from the device.", 20, 30);

  // Add the accelerometer graph to the PDF
  const accelerometerCanvas = document.getElementById('accelerometerGraph');
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Accelerometer Data", 20, 20);
  doc.addImage(accelerometerCanvas, 'PNG', 20, 30, 180, 150);

  // Add the gyroscope graph to the PDF
  const gyroscopeCanvas = document.getElementById('gyroscopeGraph');
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Gyroscope Data", 20, 20);
  doc.addImage(gyroscopeCanvas, 'PNG', 20, 30, 180, 150);

  // Add the rotation vector graph to the PDF
  const rotationVectorCanvas = document.getElementById('rotationVectorGraph');
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Rotation Vector Data", 20, 20);
  doc.addImage(rotationVectorCanvas, 'PNG', 20, 30, 180, 150);

  // Add the linear acceleration graph to the PDF
  const linearAccelerationCanvas = document.getElementById('linearAccelerationGraph');
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Linear Acceleration Data", 20, 20);
  doc.addImage(linearAccelerationCanvas, 'PNG', 20, 30, 180, 150);

  // Add a closing statement
  doc.addPage();
  doc.setFontSize(12);
  doc.text("Report generated on: " + new Date().toLocaleString(), 20, 20);

  // Save the PDF
  doc.save('SensorDataReport.pdf');
});
// Placeholder currentUser object (for demo purposes)
let currentUser = {
  phoneNumber: '123-456-7890',
  username: 'User1',
};

// Toggle visibility of the dropdown menu
function toggleDropdown() {
  const dropdownMenu = document.getElementById('settingsDropdown');
  dropdownMenu.classList.toggle('show-dropdown');
}

// Handle Change Phone Number action
function changePhoneNumber() {
  const phoneNumber = prompt('Enter the new phone number:', '123-456-7890');
  if (phoneNumber) {
    alert('Phone number updated!');
  }
  hideDropdown(); // Hide dropdown after action
}

// Handle Change Username action
function changeUsername() {
  const username = prompt('Enter the new username:', 'User1');
  if (username) {
    alert('Username updated!');
  }
  hideDropdown(); // Hide dropdown after action
}

// Handle Delete User action
function deleteUser() {
  const confirmation = confirm('Are you sure you want to delete this user?');
  if (confirmation) {
    alert('User deleted!');
    window.location.href = "Index.html";  // Redirect to "Choose User" page
  }
  hideDropdown(); // Hide dropdown after action
}

// Hide the dropdown menu
function hideDropdown() {
  const dropdownMenu = document.getElementById('settingsDropdown');
  dropdownMenu.classList.remove('show-dropdown');
}

// Store phone number when it is changed
document.getElementById("changePhoneNumberBtn").addEventListener("click", function () {
  const phoneNumber = prompt("Enter the new phone number:");
  if (phoneNumber) {
    localStorage.setItem("userPhoneNumber", phoneNumber); // Store the phone number in localStorage
    alert("Phone number updated successfully.");
  }
});

// Store username when it is changed
document.getElementById("changeUsernameBtn").addEventListener("click", function () {
  const newUsername = prompt("Enter the new username:");
  if (newUsername) {
    // Update the username in the choose user section
    document.getElementById("current-user").textContent = `User: ${newUsername}`;
    alert("Username updated successfully.");
  }
});

// Delete user and return to choose user section
document.getElementById("deleteUserBtn").addEventListener("click", function () {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (confirmDelete) {
    // Clear local storage data related to the user
    localStorage.removeItem("userPhoneNumber");

    // Hide the device management section and show the choose user section again
    document.getElementById("device-management-section").style.display = "none";
    document.getElementById("choose-user-section").style.display = "block";

    alert("User deleted successfully.");
  }
});

// Autofill user phone number when adding a new device
document.getElementById("addDeviceButton").addEventListener("click", function () {
  // Check if a phone number is stored in localStorage
  const storedPhoneNumber = localStorage.getItem("userPhoneNumber");
  if (storedPhoneNumber) {
    document.querySelector("#newDeviceForm input[placeholder='[USER PHONE NUMBER]*']").value = storedPhoneNumber; // Autofill user phone number
  }
});

// Toggle dropdown menu when profile button is clicked
function toggleProfileDropdown() {
  const profileDropdown = document.getElementById("profileDropdownMenu");
  const isVisible = profileDropdown.style.display === "block";
  // Toggle visibility
  profileDropdown.style.display = isVisible ? "none" : "block";
}

// Switch user functionality
function switchUser() {
  // Hide device management section and show the choose user section
  document.getElementById("device-management-section").style.display = "none";
  document.getElementById("choose-user-section").style.display = "block";
  // Optionally reset any necessary states (like user data)
  // If you want to clear user-specific data, you could do it here, for example:
  // localStorage.removeItem("userPhoneNumber"); // To clear phone number
}


function fetchDeviceStatusFromServer() {
  // Fetch device status from your backend (API endpoint)
  fetch('/api/device-status')
    .then(response => response.json())
    .then(data => {
      // Update status in the table dynamically
      document.getElementById('device-1-status').innerText = data.device1Status;
      document.getElementById('device-2-status').innerText = data.device2Status;
      document.getElementById('device-3-status').innerText = data.device3Status;

      // Color code the statuses
      colorCodeStatus('device-1-status', data.device1Status);
      colorCodeStatus('device-2-status', data.device2Status);
      colorCodeStatus('device-3-status', data.device3Status);
    })
    .catch(error => console.error('Error fetching device status:', error));
}

// Poll every 5 seconds to get the latest device status
setInterval(fetchDeviceStatusFromServer, 5000);

app.get('/api/device-status', (req, res) => {
  // This would fetch the status of devices from your database
  res.json({
    device1Status: 'Online',
    device2Status: 'Offline',
    device3Status: 'Pending'
  });
});

// Color code the status dynamically
function colorCodeStatus(elementId, status) {
  const statusElement = document.getElementById(elementId);

  switch (status) {
    case 'Online':
      statusElement.classList.add('online');
      statusElement.classList.remove('offline', 'pending');
      break;
    case 'Offline':
      statusElement.classList.add('offline');
      statusElement.classList.remove('online', 'pending');
      break;
    case 'Pending':
      statusElement.classList.add('pending');
      statusElement.classList.remove('online', 'offline');
      break;
    default:
      statusElement.classList.remove('online', 'offline', 'pending');
  }
}