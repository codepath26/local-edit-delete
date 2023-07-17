window.addEventListener("DOMContentLoaded", function () {
  renderUserList();

  let userForm = document.getElementById("userForm");
  userForm.addEventListener("submit", addUser);
});

function renderUserList() {
  let userList = document.getElementById("userList");
  userList.innerHTML = "";

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.forEach(function (user, index) {
    let listItem = document.createElement("li");
    listItem.textContent = `${user.username} (${user.email}) - DOB: ${user.dob}`;

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editUser(index);
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteUser(index);
    });

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    userList.appendChild(listItem);
  });
}

function addUser(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let dob = document.getElementById("dob").value;

  let user = {
    username: username,
    email: email,
    dob: dob
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  renderUserList();

  document.getElementById("userForm").reset();
}

function editUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users[index];

  let listItem = document.createElement("li");
  listItem.innerHTML = `
    <input type="text" id="editUsername" value="${user.username}" required>
    <input type="email" id="editEmail" value="${user.email}" required>
    <input type="date" id="editDOB" value="${user.dob}" required>
    <button id="updateButton">Update</button>
  `;

  let userList = document.getElementById("userList");
  let existingListItem = userList.children[index];
  userList.replaceChild(listItem, existingListItem);

  let updateButton = document.getElementById("updateButton");
  updateButton.addEventListener("click", function () {
    let updatedUsername = document.getElementById("editUsername").value;
    let updatedEmail = document.getElementById("editEmail").value;
    let updatedDOB = document.getElementById("editDOB").value;

    user.username = updatedUsername;
    user.email = updatedEmail;
    user.dob = updatedDOB;

    localStorage.setItem("users", JSON.stringify(users));
    renderUserList();
  });
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));

  renderUserList();
}
