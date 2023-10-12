let userInputElement = document.getElementById("phone-number");
let feedbackElement = document.getElementById("feedback");
let networkLogo = document.getElementById("networkLogo");
let networkCarrier = document.getElementById("network-carrier");

let submit = document.getElementById("submit");

//checks for input of the user immediately
userInputElement.oninput = function () {
  let phoneNum = userInputElement.value;

  let numCode = phoneNum.substr(0, 4);
  let intNumCode = phoneNum.substr(0, 7);

  let newIntNumCode = intNumCode.replace("+234", "0");

  let selected = false;
  let foundProvider = false;

  function detectNumberPattern() {
    if (numCode.startsWith("0")) {
      userInputElement.maxLength = "11";
    } else {
      userInputElement.maxLength = "14";
    }
  }

  detectNumberPattern();

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

  function mtnValidator() {
    for (let i = 0; i < mtn.length; i++) {
      if (numCode.startsWith(mtn[i]) || newIntNumCode.startsWith(mtn[i])) {
        // feedbackElement.innerText = `The number ${phoneNum} is MTN`;
        networkLogo.src = "./assets/mtn.png";
        userInputElement.style.borderColor = "Yellow";
        networkCarrier.value = "mtn";
        foundProvider = true;
      }
    }
  }

  function gloValidator() {
    for (let i = 0; i < glo.length; i++) {
      if (numCode.startsWith(glo[i]) || newIntNumCode.startsWith(glo[i])) {
        // feedbackElement.innerText = `The number ${phoneNum} is Glo`;
        networkLogo.src = "./assets/glo.jpeg";
        userInputElement.style.borderColor = "Green";
        networkCarrier.value = "glo";
        foundProvider = true;
      }
    }
  }

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

  function NmobileValidator() {
    for (let i = 0; i < Nmobile.length; i++) {
      if (
        numCode.startsWith(Nmobile[i]) ||
        newIntNumCode.startsWith(Nmobile[i])
      ) {
        // feedbackElement.innerText = `The number ${phoneNum} is 9mobile`;
        networkLogo.src = "./assets/9mobile.png";
        userInputElement.style.borderColor = "darkgreen";
        networkCarrier.value = "9mobile";
        foundProvider = true;
      }
    }
  }

  switch (networkCarrier.value) {
    case "Detect":
      selected = true;
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
      userInputElement.maxLength = "1";
  }

  if (!selected) {
    feedbackElement.innerText = `Please pick a network or pick detect`;
  } else {
    feedbackElement.innerText = "";
  }

  if (selected && !foundProvider) {
    feedbackElement.innerText = `No network provider found`;
    networkLogo.src = "";
    userInputElement.style.borderColor = "rgb(76, 110, 245)";
  }
};

let amount = document.getElementById("airtime-amount");
let alertPurchase = document.getElementById("alertPurchase");

// function validateNumber() {
//   if (
//     userInputElement.maxLength != "11" ||
//     userInputElement.maxLength != "14"
//   ) {
//     alertPurchase.style.backgroundColor = "red";
//     alertPurchase.style.display = "block";
//     alertPurchase.innerText = "Phone Number not complete";
//   }
// }

document.getElementById("purchaseForm").addEventListener("submit", () => {
  alertPurchase.style.display = "block";
  alertPurchase.style.backgroundColor = "green";
  alertPurchase.textContent = `You have Successfully Purchased ${amount.value} ${networkCarrier.value} Airtime`;
});
