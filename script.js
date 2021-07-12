const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// global variable
let apiQuotes = [];

//show new quotes
function newQuote() {
  // pick a random quote from apiquotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //check if author field is blank, basically if (quote.author == null)
  if(!quote.author) {
    authorText.textContent = "Unknown";
  } else {
      authorText.textContent = quote.author;
  }

  //check quote length to determine styling
  if(quote.text.length > 50) {
      quoteText.classList.add('long-quote');
  } else {
      quoteText.classList.remove('long-list');
  }

  quoteText.textContent = quote.text;
  console.log(quote);
}

// Get quotes from API
async function getQuotes() {
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

// on load
getQuotes();

// // code for when using local quotes
// function newQuote() {
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// newQuote();
