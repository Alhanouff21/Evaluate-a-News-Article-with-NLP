

  function updateUI(data) {
    const resultsContainer = document.getElementById('results');
  
    resultsContainer.innerText = 
    `Subjectivity: ${data.subjectivity}
    Agreement: ${data.agreement}
    Irony: ${data.irony}
    Confidence: ${data.confidence}`;
  }
  
  
  export { updateUI };