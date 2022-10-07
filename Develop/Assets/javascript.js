var randomBtn = document.querySelector('.btn-2');
var body = document.querySelector('body')

var results = document.createElement('div');
body.appendChild(results);

var APIKey = 'wb2uvHErZufqaDA4aEQjDBE7jQBpEfkX';

function getRandomBook(event) {
    event.preventDefault()

    while (results.hasChildNodes()) {
        results.removeChild(results.firstChild);
    }

    fetch('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=' + APIKey)
    .then(function(response) {
        return response.json();
    })
    .then(function(book) {
        console.log(book)
        var bookList = book.results.lists
        console.log(bookList)
        var randomList = bookList[Math.floor(Math.random() * bookList.length)]
        console.log(randomList)
        console.log(randomList.books)
        var randomBook = randomList.books[Math.floor(Math.random() * randomList.books.length)]
        console.log(randomBook)

        var img = document.createElement('img');
        img.setAttribute('src', randomBook.book_image);
        img.setAttribute('alt', 'Book image not found for' + randomBook.title);
        results.appendChild(img)

        var title = document.createElement('h2');
        title.textContent = randomBook.title;
        results.appendChild(title);

        var author = document.createElement('h3');
        author.textContent = randomBook.author;
        results.appendChild(author);

        var description = document.createElement('p');
        description.textContent = randomBook.description;
        results.appendChild(description);

        var amazon = document.createElement('a');
        amazon.textContent = 'Amazon URL';
        amazon.setAttribute('href', randomBook.amazon_product_url);
        amazon.target = '_blank';
        results.appendChild(amazon);

        var newBookBtn = document.createElement('button');
        newBookBtn.textContent = 'Choose New Book';
        results.appendChild(newBookBtn);

        newBookBtn.addEventListener('click',getRandomBook)

    })
}

randomBtn.addEventListener('click', getRandomBook)