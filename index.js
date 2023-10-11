let userInputElement = document.getElementById("phone-number");
let feedbackElement = document.getElementById("feedback");
let networkLogo = document.getElementById("networkLogo");
let networkCarrier = document.getElementById("network-carrier");

let mtn = false;
let airtel = false;
let glo = false;
let Nmobile = false;

switch (networkCarrier.value) {
  case "detect":
    mtn = true;
    airtel = true;
    glo = true;
    Nmobile = true;
    break;
  case "mtn":
    mtn = true;
    break;
  case "airtel":
    airtel = true;
    break;
  case "glo":
    glo = true;
    break;
  case "9mobile":
    Nmobile = true;
    break;
  default:
    mtn = false;
    airtel = false;
    glo = false;
    Nmobile = false;
}

userInputElement.oninput = function () {
  console.log(networkCarrier.value);
  let phoneNum = userInputElement.value;

  let numCode = phoneNum.substr(0, 4);
  let intNumCode = phoneNum.substr(0, 7);

  let newIntNumCode = intNumCode.replace("+234", "0");

  let foundProvider = false;

  if (numCode.startsWith("0")) {
    userInputElement.maxLength = "11";
  } else {
    userInputElement.maxLength = "14";
  }

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
  ];

  let glo = ["0805", "0905", "0807", "0811", "0705", "0815"];

  let airtel = ["0907", "0708", "0802", "0902", "0812", "0808", "0701"];

  let Nmobile = ["0909", "0908", "0818", "0809", "0817"];

  if (mtn) {
    for (let i = 0; i < mtn.length; i++) {
      if (numCode.startsWith(mtn[i]) || newIntNumCode.startsWith(mtn[i])) {
        feedbackElement.innerText = `The number ${phoneNum} is MTN`;
        networkLogo.src = "./assets/mtn.png";
        userInputElement.style.borderColor = "Yellow";
        foundProvider = true;
      }
    }
  }

  if (glo) {
    for (let i = 0; i < glo.length; i++) {
      if (numCode.startsWith(glo[i]) || newIntNumCode.startsWith(glo[i])) {
        feedbackElement.innerText = `The number ${phoneNum} is Glo`;
        networkLogo.src = "./assets/glo.jpeg";
        userInputElement.style.borderColor = "Green";
        foundProvider = true;
      }
    }
  }

  if (airtel) {
    for (let i = 0; i < airtel.length; i++) {
      if (
        numCode.startsWith(airtel[i]) ||
        newIntNumCode.startsWith(airtel[i])
      ) {
        feedbackElement.innerText = `The number ${phoneNum} is airtel`;
        networkLogo.src = "./assets/airtel.jpeg";
        userInputElement.style.borderColor = "Red";
        foundProvider = true;
      }
    }
  }

  if (Nmobile) {
    for (let i = 0; i < Nmobile.length; i++) {
      if (
        numCode.startsWith(Nmobile[i]) ||
        newIntNumCode.startsWith(Nmobile[i])
      ) {
        feedbackElement.innerText = `The number ${phoneNum} is 9mobile`;
        networkLogo.src = "./assets/9mobile.png";
        userInputElement.style.borderColor = "darkgreen";
        networkCarrier.option.value = "9MOBILE";
        foundProvider = true;
      }
    }
  }

  if (!foundProvider) {
    feedbackElement.innerText = `No network provider found`;
    userInputElement.style.borderColor = "rgb(76, 110, 245)";
  }
};
