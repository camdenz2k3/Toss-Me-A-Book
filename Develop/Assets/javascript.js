var randomBtn = document.getElementById('random');
var resultsCard = document.getElementById('card');

var APIKey = 'wb2uvHErZufqaDA4aEQjDBE7jQBpEfkX';

function getRandomBook() {
    fetch('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=' + APIKey)
    .then(function(response) {
        return response.json();
    })
    .then(function(book) {
        console.log(book)
        
        
        console.log(book.results.lists[i].books[i].title);

    })
}

randomBtn.addEventListener('click', getRandomBook)