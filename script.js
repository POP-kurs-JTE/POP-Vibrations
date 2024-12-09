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
  // Test comment
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
