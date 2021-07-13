const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// global variable
let apiQuotes = [];

// hidding hides are div, set to false so we don't want it to be hidden\
// when loader is going quotecontainer is hidden
function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show new quotes
function newQuote() {
  showLoadingSpinner();
  // pick a random quote from apiquotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //check if author field is blank, basically if (quote.author == null)
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-list");
  }

  // Set quote and hide loader 
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    //response works only when data is being set
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // handle error here can use with alerta a
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();

// // code for when using local quotes
// function newQuote() {
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// newQuote();
