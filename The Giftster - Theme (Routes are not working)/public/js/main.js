const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);

let sign_in = document.getElementById("sign-in");
let password_confirm = document.getElementById("floatingPassword2");
let next = document.getElementById("nextBtn");

password_confirm.addEventListener("keydown", function () {
  if (password_confirm.value.length !== 0) {
    sign_in.innerHTML = "Next";
    sign_in.classList = "btn w-100 btn-lg btn-outline-success";
  }
});
password_confirm.addEventListener("keyup", function () {
  if (password_confirm.value.length === 0) {
    sign_in.innerHTML = "Sign In";
    sign_in.classList = "btn w-100 btn-lg btn-primary";
  }
});
sign_in.addEventListener("click", function () {
  if (password_confirm.value.length !== 0) {
    sign_in.type = "submit";
    next.style.visibility = "initial";
    document.getElementById("prevBtn").style.visibility = "initial";
  }
});

document.getElementById("prev").addEventListener("click", function () {
  document.getElementById("nextBtn").style.visibility = "initial";
  document.getElementById("prevBtn").style.visibility = "initial";
});
document.getElementById("prevBtn").addEventListener("click", function () {
  document.getElementById("nextBtn").style.visibility = "hidden";
  document.getElementById("prevBtn").style.visibility = "hidden";
});
// if (!password_confirm) {
// }
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").style.visibility = "hidden";
    document.getElementById("prevBtn").style.visibility = "hidden";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }

  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
