//Getting references to the inputs and logo
let userInputElement = document.getElementById("phone-number");
let feedbackElement = document.getElementById("feedback");
let networkLogo = document.getElementById("networkLogo");
let networkCarrier = document.getElementById("network-carrier");
let alertAmount = document.getElementById("alertAmount");

//Value of airtime amount user inputted
let amount = document.getElementById("airtime-amount");

let submit = document.getElementById("submit");

//Amount validator
amount.oninput = function () {
  if (amount.value / 2 < 50 || amount.value % 2 !== 0) {
    alertAmount.style.display = "block";
    alertAmount.innerText = "Airtime Starts from N100";
    alertAmount.style.color = "red";
  } else {
    alertAmount.style.display = "none";
  }
};

//checks for input of the user immediately
userInputElement.oninput = function () {
  let phoneNum = userInputElement.value;

  //Gets first four digits of normal number
  let numCode = phoneNum.substr(0, 4);
  //Gets first seven digits for +234 numbers
  let intNumCode = phoneNum.substr(0, 7);

  //Replace +234 with zero
  let newIntNumCode = intNumCode.replace("+234", "0");

  //tracking in an a network provider is selected
  let selected = false;
  //tracking if a network provider has being found
  let foundProvider = false;

  //For detecting if a number starts with 0 or +234
  //if it starts with 0 then the maximum digits of the number will be 11 digits
  //like wise if it starts with starts otherwise e.g +234 maximun digits is 14 digits
  function detectNumberPattern() {
    if (numCode.startsWith("0")) {
      userInputElement.maxLength = "11";
    } else {
      userInputElement.maxLength = "14";
    }
  }

  //calling the function
  detectNumberPattern();

  //Arrays of all the possible prfixes of the network provider
  let mtn = [
    "0803",
    "0806",
    "0810",
    "0816",
    "0814",
    "0813",
    "0706",
    "0903",
    "0703",
    "0906",
    "0916",
  ];

  let glo = ["0805", "0905", "0807", "0811", "0705", "0815"];

  let airtel = ["0907", "0708", "0802", "0902", "0812", "0808", "0701"];

  let Nmobile = ["0909", "0908", "0818", "0809", "0817"];

  //function for checking if a number is mtn
  function mtnValidator() {
    for (let i = 0; i < mtn.length; i++) {
      if (numCode.startsWith(mtn[i]) || newIntNumCode.startsWith(mtn[i])) {
        networkLogo.src = "./assets/mtn.png";
        userInputElement.style.borderColor = "Yellow";
        networkCarrier.value = "mtn";
        foundProvider = true; // updating the found provider
      }
    }
  }

  //function for checking if a number is glo
  function gloValidator() {
    for (let i = 0; i < glo.length; i++) {
      if (numCode.startsWith(glo[i]) || newIntNumCode.startsWith(glo[i])) {
        networkLogo.src = "./assets/glo.jpeg";
        userInputElement.style.borderColor = "Green";
        networkCarrier.value = "glo";
        foundProvider = true;
      }
    }
  }

  //function for checking if a number is airtel
  function airtelValidator() {
    for (let i = 0; i < airtel.length; i++) {
      if (
        numCode.startsWith(airtel[i]) ||
        newIntNumCode.startsWith(airtel[i])
      ) {
        // feedbackElement.innerText = `The number ${phoneNum} is airtel`;
        networkLogo.src = "./assets/airtel.jpeg";
        userInputElement.style.borderColor = "Red";
        networkCarrier.value = "airtel";
        foundProvider = true;
      }
    }
  }

  //function for checking if a number is 9mobile or Nmobile
  function NmobileValidator() {
    for (let i = 0; i < Nmobile.length; i++) {
      if (
        numCode.startsWith(Nmobile[i]) ||
        newIntNumCode.startsWith(Nmobile[i])
      ) {
        networkLogo.src = "./assets/9mobile.png";
        userInputElement.style.borderColor = "darkgreen";
        networkCarrier.value = "9mobile";
        foundProvider = true;
      }
    }
  }

  //conditionals for checking the value of the network provider picked
  switch (networkCarrier.value) {
    case "Detect":
      selected = true; // updating the selected
      detectNumberPattern();
      mtnValidator();
      airtelValidator();
      gloValidator();
      NmobileValidator();
      break;
    case "mtn":
      selected = true;
      detectNumberPattern();
      mtnValidator();
      break;
    case "airtel":
      selected = true;
      detectNumberPattern();
      airtelValidator();
      break;
    case "glo":
      selected = true;
      detectNumberPattern();
      gloValidator();
      break;
    case "9mobile":
      selected = true;
      detectNumberPattern();
      NmobileValidator();
      break;
    default:
      selected = false;
      //for stopping the user from further inputtting if no network provider picked
      userInputElement.maxLength = "1";
  }

  //if no network picked
  if (!selected) {
    feedbackElement.innerText = `Please pick a network or pick detect`; // Display message
  } else {
    feedbackElement.innerText = ""; //Don't display message
  }

  //if network selected but no network provider found
  if (selected && !foundProvider) {
    feedbackElement.innerText = `No network provider found`;
    networkLogo.src = "";
    userInputElement.style.borderColor = "rgb(76, 110, 245)";
  }
};

//Reference to display message
let alertPurchase = document.getElementById("alertPurchase");

//message to be displayed when the form is submitted
document.getElementById("purchaseForm").addEventListener("submit", () => {
  alertPurchase.style.display = "block";
  alertPurchase.style.backgroundColor = "green";
  alertPurchase.textContent = `You have Successfully Purchased ${amount.value} ${networkCarrier.value} Airtime`;
});
