// ---------------- Get form and inputs ----------------
const form = document.getElementById("signInForm");
const usernameInput = document.getElementById("usernameInput");
const usernameMsg = document.getElementById("usernameMsg");
const passInput = document.getElementById("passInput");
const passwordMsg = document.getElementById("passwordMsg");

// Eye toggle elements
const eyeToggle = document.getElementById("eye-toggle");
const eyeSlashLine = document.getElementById("eye-slash-line");

// ---------------- Eye toggle functionality ----------------
eyeToggle.addEventListener("click", () => {
  if (passInput.type === "password") {
    passInput.type = "text";              // show password
    eyeSlashLine.style.display = "none";  // hide slash line
  } else {
    passInput.type = "password";          // hide password
    eyeSlashLine.style.display = "block"; // show slash line
  }
});

// ---------------- Real-time password check ----------------
passInput.addEventListener("keyup", () => {
  const pwd = passInput.value;
  let msgs = [];

  // Check each password requirement
  if (pwd.length < 8) msgs.push("At least 8 characters");
  if (!/[A-Z]/.test(pwd)) msgs.push("Uppercase letter required");
  if (!/[a-z]/.test(pwd)) msgs.push("Lowercase letter required");
  if (!/\d/.test(pwd)) msgs.push("Number required");
  if (!/[^A-Za-z0-9]/.test(pwd)) msgs.push("Special character required");

  // Show messages under password field
  passwordMsg.innerHTML = msgs.join("<br>");
});

// ---------------- Username validation function ----------------
function validateUsername(username) {
  // Clear previous message
  usernameMsg.textContent = "";

  // Only letters allowed
  if (!/^[A-Za-z]+$/.test(username)) {
    usernameMsg.textContent = "Username must contain only letters.";
    return false;
  }

  // Minimum length
  if (username.length < 3) {
    usernameMsg.textContent = "Username must be at least 3 characters.";
    return false;
  }

  // Maximum length (real app style)
  if (username.length > 15) {
    usernameMsg.textContent = "Username must not exceed 15 characters.";
    return false;
  }

  return true; // valid
}

// ---------------- Form submission validation ----------------
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop default submission

  const username = usernameInput.value.trim();
  const password = passInput.value.trim();

  let valid = true; // assume valid until a rule fails

  // Validate username
  if (!validateUsername(username)) valid = false;

  // Validate password
  let pwdMsgs = [];
  if (password.length < 8) pwdMsgs.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) pwdMsgs.push("Uppercase letter required");
  if (!/[a-z]/.test(password)) pwdMsgs.push("Lowercase letter required");
  if (!/\d/.test(password)) pwdMsgs.push("Number required");
  if (!/[^A-Za-z0-9]/.test(password)) pwdMsgs.push("Special character required");

  if (pwdMsgs.length > 0) {
    passwordMsg.innerHTML = pwdMsgs.join("<br>");//თუ რამე არასწორია, მესიჯი ჩნდება დაჩამოვა შემდეგ ხაზზე
    valid = false;
  } else {
    passwordMsg.innerHTML = "";//თუ ყველაფერი სწორია, მესიჯი ქრება
  }

  // If everything is valid
  if (valid) {
    passwordMsg.innerHTML = "<span class='valid-msg'>Sign in successful!</span>";//თუ ყველაფერი სწორია,წარმატებით შესვლა
  }
});
