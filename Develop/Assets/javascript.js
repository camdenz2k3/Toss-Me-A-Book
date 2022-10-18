var criteriaBtn = document.querySelector('.btn');
var randomBtn = document.querySelector('.btn-2');
var body = document.querySelector('body')
var favoritesLink = document.getElementById('favorites-list');
var homeLink = document.getElementById('home');
var homePage = document.getElementById('home-page');
var favoritesList = document.getElementById('favorites');
var searchInput = document.getElementById('search-input');
var selectCat = document.getElementById('format-input')

var results = document.createElement('div');
homePage.appendChild(results);

var APIKey = 'wb2uvHErZufqaDA4aEQjDBE7jQBpEfkX';
var isbnNum = "";
var favorites = []

function saveRandomBook(randomBook) {
    console.log(isbnNum)
    isbnNum = {
        cover: randomBook.book_image,
        title: randomBook.title
    }
    console.log(isbnNum)
    favorites.push(isbnNum);
    console.log(favorites)
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function getSavedBooks() {
    var savedBooks = JSON.parse(localStorage.getItem('favorites'));
    console.log(savedBooks);
    
    if (savedBooks !== null) {
        favorites = savedBooks;
    }
}

function renderFavorites() {
    favoritesList.innerHTML = ""

    for (var i = 0; i < favorites.length; i++) {
        var savedBook = favorites[i];
        console.log(savedBook)

        var card = document.createElement('div');
        card.setAttribute('style', 'margin: 20px; background: yellow; text-align: center; width: 700px; padding: 15px')
        card.setAttribute('class', i)
        favoritesList.appendChild(card);

        var coverImg = document.createElement('img');
        coverImg.setAttribute('src', savedBook.cover);
        coverImg.setAttribute('alt', 'Book image not found for' + savedBook.title);
        card.appendChild(coverImg)

        var favoriteTitle = document.createElement('h3');
        favoriteTitle.textContent = savedBook.title;
        card.appendChild(favoriteTitle);

        // for future development
        // var clearBtn = document.createElement('button');
        // clearBtn.setAttribute('class', i)
        // clearBtn.textContent = 'Delete';
        // card.appendChild(clearBtn)
        
        // var btnNum = clearBtn.getAttribute('class');
        // console.log(btnNum)
        
        // clearBtn.addEventListener('click', function() {
        //     favorites.splice(btnNum, 1);
        //     console.log(favorites)
        //     renderFavorites()
        //     console.log('delete')
        // })
    }
    
}

function removeFavorite() {
    favorites.pop();
    console.log(favorites)
}

function getCriteriaBook(event) {
    event.preventDefault()

    while (results.hasChildNodes()) {
        results.removeChild(results.firstChild);
    }

    var inputValue = searchInput.value 
    console.log(inputValue)

    var selectValue = selectCat.value
    console.log(selectValue)

    fetch('https://openlibrary.org/search.json?' + selectValue + "=" + inputValue)
    .then(function(response){
        return response.json();
    })
    .then(function(book){
        console.log(book)
        var listBooks = book.docs
        console.log(listBooks)
        var bookRandom = listBooks[Math.floor(Math.random() * listBooks.length)]
        console.log(bookRandom)


        var criteriaImage = document.createElement('img');
        criteriaImage.setAttribute('src', 'https://covers.openlibrary.org/b/isbn/' + bookRandom.isbn[0] + '-L.jpg')
        results.appendChild(criteriaImage)

        var criteriaTitle = document.createElement('h2');
        criteriaTitle.textContent = bookRandom.title;
        results.appendChild(criteriaTitle);

        var criteriaAuthor = document.createElement('h4');
        criteriaAuthor.textContent = bookRandom.author_name;
        results.appendChild(criteriaAuthor);

        var newBookBtn = document.createElement('button');
        newBookBtn.textContent = 'Choose New Book';
        results.appendChild(newBookBtn);
        
        //Possibly create function in global scope
        var favIcon = document.createElement('i');
        favIcon.setAttribute('class', 'fa-regular fa-heart');
        results.appendChild(favIcon);

        newBookBtn.addEventListener('click',getCriteriaBook)

        favIcon.addEventListener('click', function() {
            if (favIcon.classList.contains('fa-regular')) {
                favIcon.classList.remove('fa-regular')
                favIcon.classList.add('fa-solid')
            } else if (favIcon.classList.contains('fa-solid')) {
                favIcon.classList.remove('fa-solid')
                favIcon.classList.add('fa-regular')
            }
        })


    })
}

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

        isbnNum = randomBook.primary_isbn13

        var img = document.createElement('img');
        img.setAttribute('src', randomBook.book_image);
        img.setAttribute('alt', 'Book image not found for' + randomBook.title);
        results.appendChild(img)

        var title = document.createElement('h3');
        title.textContent = randomBook.title;
        results.appendChild(title);

        var author = document.createElement('h4');
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

        var favIcon = document.createElement('i');
        favIcon.setAttribute('class', 'fa-regular fa-heart');
        results.appendChild(favIcon);

        newBookBtn.addEventListener('click',getRandomBook)

        favIcon.addEventListener('click', function() {
            if (favIcon.classList.contains('fa-regular')) {
                favIcon.classList.remove('fa-regular')
                favIcon.classList.add('fa-solid')
                saveRandomBook(randomBook)
            } else if (favIcon.classList.contains('fa-solid')) {
                favIcon.classList.remove('fa-solid')
                favIcon.classList.add('fa-regular')
                removeFavorite()
            }
        })

    })
}

criteriaBtn.addEventListener('click', getCriteriaBook)

randomBtn.addEventListener('click', getRandomBook)

favoritesLink.addEventListener('click', function() {
    homePage.setAttribute('data-state', 'hidden');
    favoritesList.setAttribute('data-state', 'visible');
    getSavedBooks()
    renderFavorites()
})

homeLink.addEventListener('click', function() {
    homePage.setAttribute('data-state', 'visible');
    favoritesList.setAttribute('data-state', 'hidden');
})

getSavedBooks()
renderFavorites()