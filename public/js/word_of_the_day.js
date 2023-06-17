async function define_word(word) {
  let word_to_search = word.toLowerCase().trim();
  return fetch(
    `https://api.wordnik.com/v4/word.json/${word_to_search}/definitions?limit=200&partOfSpeech=noun&includeRelated=false&sourceDictionaries=wiktionary&useCanonical=false&includeTags=false&api_key=nh1cb9m4yspcmwq687www9qn7j3ix3dmppv7a0ot4mn0bwr3v`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data[0] && data[0].text) {
        const text = data[0].text;
        return text.replace(/(<([^>]+)>)/gi, "");
      } else {
        return "Meaning not found";
      }
    })
    .catch((error) => console.error(error));
}

let words = ["tajine", "waragi", "pombe"];

function getWordOfTheDay() {
    // Your code to get the word of the day
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const seed = day + month + year; // Seed value based on the current date
  
    const randomIndex = seed % words.length; // Use the seed to determine the index
  
    const wordOfTheDay = words[randomIndex];
    return wordOfTheDay;
  }
  
  // Set up the timer to call the code at 12 am every day
  const timer = setInterval(() => {
    const wordOfTheDay = getWordOfTheDay();
    console.log("Word of the day:", wordOfTheDay);
    // Update the UI with the wordOfTheDay
  
    // Calculate the time until the next 12 am
    const now = new Date();
    const currentTime = now.getTime();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
    let timeUntilNext12AM = targetTime - currentTime;
  
    // If the current time is already past 12 am, set the timer for the next day
    if (timeUntilNext12AM <= 0) {
      timeUntilNext12AM += 24 * 60 * 60 * 1000; // Add 24 hours
    }
  }, timeUntilNext12AM);
  


// Update the UI with the wordOfTheDay


// let nameInput = document.querySelector("#name-input");
// let nameButton = document.querySelector("#name-button");

// nameButton.addEventListener("click", async function () {
//   let meaning = await define_word(nameInput.value);
//   console.log(meaning);

//   let meaningDiv = document.querySelector("#name-meaning");
//   meaningDiv.textContent = `Meaning: ${meaning}`;

//   nameInput.value = "";
// });
