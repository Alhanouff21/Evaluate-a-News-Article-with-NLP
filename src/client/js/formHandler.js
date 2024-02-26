import { updateUI } from './updatedata.js';

async function handleSubmit(event) {
  event.preventDefault();
  try {
    const inputText = document.getElementById("userInput").value;
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi;
    const match = inputText.match(urlRegex);
    if (!match) {
      alert("Please enter a VALID article or blog URL");
      return;
    }
    const response = await fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: inputText }),
    });

    if (!response.ok) {
      throw new Error("An error occurred while analyzing the article.");
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
}

export { handleSubmit };



// const checkForURL = (input) => {
//   const url  = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi;
//   const match = input.match(url);

//   return match ? true : false;
// };

// export { checkForURL };