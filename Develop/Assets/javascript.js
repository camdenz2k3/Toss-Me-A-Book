var criteriaBtn = document.querySelector('.btn');
var randomBtn = document.querySelector('.btn-2');
var body = document.querySelector('body')
var favoritesLink = document.getElementById('favorites-list');
var homeLink = document.getElementById('home');
var homePage = document.getElementById('home-page');
var favoritesList = document.getElementById('favorites');
var searchInput = document.getElementById('search-input');
var selectCat = document.getElementById('format-input');
var searchBtn = document.querySelector('.search');
var closeBtn = document.querySelector('.delete');
var modal = document.querySelector('.modal');

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
        card.setAttribute('class', 'card column is-full');
        favoritesList.appendChild(card);

        var cardImg = document.createElement('div');
        cardImg.setAttribute('class', 'card-image');
        card.appendChild(cardImg);

        var figure = document.createElement('figure')
        figure.setAttribute('class', 'image is-4by3')
        cardImg.appendChild(figure)

        var coverImg = document.createElement('img');
        coverImg.setAttribute('src', savedBook.cover);
        coverImg.setAttribute('alt', 'Book image not found for' + savedBook.title);
        figure.appendChild(coverImg)

        var cardContent = document.createElement('div')
        cardContent.setAttribute('class', 'card-content')
        card.appendChild(cardContent)

        var cardMedia = document.createElement('div')
        cardMedia.setAttribute('class', 'media')
        cardContent.appendChild(cardMedia)

        var mediaContent = document.createElement('div')
        mediaContent.setAttribute('class', 'media-content')
        cardMedia.appendChild(mediaContent)

        var favoriteTitle = document.createElement('p');
        favoriteTitle.setAttribute('class', 'title is-4')
        favoriteTitle.textContent = savedBook.title;
        card.appendChild(favoriteTitle);

        var clearBtn = document.createElement('button');
        clearBtn.setAttribute('class', i)
        clearBtn.textContent = 'Delete';
        card.appendChild(clearBtn)
        
        clearBtn.addEventListener('click', function(event) {
            var btnNum = Number(event.target.getAttribute('class'));
            console.log(btnNum)
            favorites.splice(btnNum, 1);
            console.log(favorites)
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites()
            console.log('delete')
        })
    }
    
}

function removeFavorite() {
    favorites.pop();
    console.log(favorites)
}

function getCriteriaBook(event) {
    event.preventDefault()
    modal.classList.remove('is-active')

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
    favoritesList.innerHTML = ""
})

criteriaBtn.addEventListener('click', function() {
    modal.classList.add('is-active')
    searchBtn.addEventListener('click', getCriteriaBook)
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('is-active')
    })
})

getSavedBooks()