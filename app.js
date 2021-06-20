const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitter = document.getElementById("twitter");
const loader = document.getElementById('loader')
const quoteContainer = document.getElementById("quote-container");
function fetchQuote() {
  loading();
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then(getQuote)
    .catch(errorHandler);
}
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}
function getQuote(quoteData) {
  loading();
  if (quoteData.content.length > 120) {
    quote.classList.add("long-quote");
  } else {
    quote.classList.remove("long-quote");
  }
  complete();
  quote.innerText = quoteData.content;
  author.innerText = quoteData.author;
}
function errorHandler(error) {
  console.log(error);
  alert("Error with the server.");
}
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}
twitter.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", fetchQuote);
fetchQuote();