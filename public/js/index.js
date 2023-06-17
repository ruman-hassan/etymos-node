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
  
  let nameInput = document.querySelector("#name-input");
  let nameButton = document.querySelector("#name-button");
  
  nameButton.addEventListener("click", async function () {
    let meaning = await define_word(nameInput.value);
    console.log(meaning);
  
    let meaningDiv = document.querySelector("#name-meaning");
    meaningDiv.textContent = `Meaning: ${meaning}`;
  
    nameInput.value = "";
  });
  