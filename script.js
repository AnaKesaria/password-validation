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
  let msgs = [];/* ცარიელი მასივი */
/* If you press "A" on your keyboard and then release it → the keyup event fires. */

  // Check each password requirement before submission
   if (pwd.length < 8) msgs.push("At least 8 characters");
  if (!/[A-Z]/.test(pwd)) msgs.push("Uppercase letter required");
  if (!/[a-z]/.test(pwd)) msgs.push("Lowercase letter required");
  if (!/\d/.test(pwd)) msgs.push("Number required");
  if (!/[^A-Za-z0-9]/.test(pwd)) msgs.push("Special character required"); 

  // Show messages under password field
  passwordMsg.innerHTML = msgs.join("<br>");
});
/* .join("<br>") → joins all the array elements into one string, separated by a line break (<br>). */

// ---------------- Username validation function ----------------
function validateUsername(username) {
  // Clear previous message
  usernameMsg.textContent = "";

  // Only letters allowed
  if (!/^[A-Za-zა-ჰ]+$/.test(username)) {
    usernameMsg.textContent = "Username must contain only letters.";
    return false;
  }/* ეს რეგულარული გამოსახულება ნიშნავს
   : „სტრინგი უნდა შედგებოდეს მხოლოდ ერთი ან მეტი ქართული ან ინგლისური ასოსგან და არ შეიცავდეს სხვა სიმბოლოებს“.
   ^ - სტრინგის დასაწყისი,$ - სტრინგის დასასრული,[A-Za-zა-ჰ] - ნებისმიერი დიდი ან პატარა ინგლისური ან ქართული ასო,
   + - ერთი ან მეტი წინამორბედი ელემენტი
   ! - უარყოფა,
   ანუ ეს ნიშნავს თუ არ იწყება და მთავრდება ქართულ ან ინგლისურ ასო ბგერაზე
 */

  // Minimum length
  if (username.length < 3) {
    usernameMsg.textContent = "Username must be at least 3 characters.";
    return false;
  }

  // Maximum length 
  if (username.length > 50) {
    usernameMsg.textContent = "Username must not exceed 50 characters.";
    return false;
  }

  return true; // valid
}

// ---------------- Form submission validation ----------------
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop default submission
  /* In the case of a form submit event:

    Default behavior = send the form and refresh the page
    Sign In successful” message disappeared immediately — the page refreshed before I could see it. */

  const username = usernameInput.value.trim();
  const password = passInput.value.trim();
    /* .trim() is a string method in JavaScript.

    It removes whitespace from both ends of the string (spaces, tabs, newlines). */

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
