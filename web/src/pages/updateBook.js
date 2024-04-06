import MusicPlaylistClient from '../api/musicPlaylistClient';
import Header from '../components/header';
import BindingClass from '../util/bindingClass';
import DataStore from '../util/DataStore';

/**
 * Logic needed for the update book page of the website.
 */
class UpdateBook extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['mount', 'submit', 'redirectToBooklist'], this);
        this.dataStore = new DataStore();
        this.dataStore.addChangeListener(this.redirectToBooklist);
        this.header = new Header(this.dataStore);
        console.log("updateBook constructor");
    }

    /**
     * Add the header to the page and load the MusicPlaylistClient.
     */
    mount() {
        document.getElementById('update').addEventListener('click', this.submit);

        this.header.addHeaderToPage();

        this.client = new MusicPlaylistClient();
    }

    /**
     * Method to run when the update book submit button is pressed. Call the MusicPlaylistService to update the
     * book.
     */
    async submit(evt) {
        evt.preventDefault();

        const errorMessageDisplay = document.getElementById('error-message');
        errorMessageDisplay.innerText = ``;
        errorMessageDisplay.classList.add('hidden');

        const updateButton = document.getElementById('update');
        const origButtonText = updateButton.innerText;
        updateButton.innerText = 'Loading...';

        const commentsText = document.getElementById('comments').value;
        const id = document.getElementById('booklist-id').value;
        const asin = document.getElementById('book-asin').value;

        let comments;
        if (commentsText.length < 1) {
            comments = null;
        } else {
            comments = commentsText.split(/\s*,\s*/);
        }

        const book = await this.client.updateBookInBooklist(id, asin, (error) => {
            createButton.innerText = origButtonText;
            console.log("update button clicked on updateBook page");
            errorMessageDisplay.innerText = `Error: ${error.message}`;
            errorMessageDisplay.classList.remove('hidden');
        });
        this.dataStore.set('book', book);
    }

    /**
     * When the book is updated in the datastore, redirect back to the booklist page.
     */
    redirectToBooklist() {
        const book = this.dataStore.get('book');
        if (book != null) {
            window.location.href = `/booklist.html?id=${booklist.id}`;
        }
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const updateBook = new UpdateBook();
    updateBook.mount();
};

window.addEventListener('DOMContentLoaded', main);
