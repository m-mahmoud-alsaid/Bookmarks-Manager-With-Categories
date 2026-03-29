let addBookmarkButton = document.getElementById('add-bookmark-button');
let categoriesList = document.getElementById('categories');

function storeBookmarks() {
    let bookmarkTxt = document.getElementById('bookmark-name-input').value.trim();
    let bookmarkURL = document.getElementById('bookmark-url-input').value.trim();
    let categoryTxt = document.getElementById('category-name-input').value.trim();
    let warningMessage = document.getElementById('warning-message');

    if (!bookmarkTxt || !bookmarkURL || !categoryTxt) {
        warningMessage.textContent = 'Warning: Fill All Fields Please.';
        warningMessage.style.cssText = 'display: block; text-align: center; font-weight: bold; color:#FF5722;';
        return;
    }

    const allBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    if (!allBookmarks[categoryTxt]) allBookmarks[categoryTxt] = [];
    allBookmarks[categoryTxt].push({ bookmarkTxt, bookmarkURL });
    localStorage.setItem('bookmarks', JSON.stringify(allBookmarks));
    warningMessage.style.display = 'none';
    displayCategories();
}

function displayCategories() {
    const allBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    categoriesList.innerHTML = '';
    if (!allBookmarks) return;

    for (let category in allBookmarks) {
        let li = document.createElement('li');
        li.classList.add("category");
        li.textContent = category;
        categoriesList.appendChild(li);
    }
}

function displayBookmarks(categoryName) {
    const allBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (!allBookmarks || !allBookmarks[categoryName]) return;

    const bookmarksContainer = document.getElementById('bookmarks');
    bookmarksContainer.innerHTML = '';

    allBookmarks[categoryName].forEach(bookmark => {
        let box = document.createElement('div');
        box.classList.add('bookmarks-box');

        let categoryNameElem = document.createElement('p');
        categoryNameElem.classList.add('category-name');
        categoryNameElem.textContent = categoryName;

        let bookmarkNameElem = document.createElement('a');
        bookmarkNameElem.classList.add('bookmark-name');
        bookmarkNameElem.textContent = bookmark.bookmarkTxt;
        bookmarkNameElem.href = bookmark.bookmarkURL;

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'delete';
        deleteButton.onclick = () => {
            const index = allBookmarks[categoryName].indexOf(bookmark);
            if (index > -1) allBookmarks[categoryName].splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(allBookmarks));
            displayBookmarks(categoryName);
        };

        box.appendChild(categoryNameElem);
        box.appendChild(bookmarkNameElem);
        box.appendChild(deleteButton);
        bookmarksContainer.appendChild(box);
    });
}

window.onload = displayCategories;
addBookmarkButton.onclick = storeBookmarks;

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category')) {
        displayBookmarks(e.target.textContent);
    }
});