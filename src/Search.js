import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './BookDetails';

////class of react component for book search

class SearchBooks extends Component {
    state = {
        query: '',
        resultNum: 20,
        books: []
    };
    //////////////update the component state /////////////////////
    updateQuery = (query) => {
            this.setState({ query: query });
            //Search Books
            this.searchBooks(query);
        }
        //////////////Search Book function and update the books state ////////////////////////////   
    searchBooks = (query) => {
        if (query === '') {
            this.setState({ books: [] });

        } else {
            BooksAPI.search(query, this.resultNum).then(books => {
                //Check if the object is array or no 
                if (Array.isArray(books)) {
                    this.checkShelvesOfBooks(books, this.props.books);
                }
            });
        }
    };
    //////////check and put the book in the right place
    checkShelvesOfBooks = (searchBooks, currentBooks) => {
        const shelvedBooks = searchBooks.map(searchBook => {
            const currentBook = currentBooks.filter(
                Book => Book.id === searchBook.id
            )[0];
            if (!currentBook) {
                searchBook.shelf = 'none';

            } else {
                searchBook.shelf = currentBook.shelf;
            }
            return searchBook;
        });
        //update the books using set state
        this.setState({ books: shelvedBooks });
    };

    ///////////////////////
    render() {
        //start render
        return ( <
            div className = "search-books" >
            <
            div className = "search-books-bar" >
            <
            Link className = "close-search"
            to = "/" >
            Close <
            /Link> <
            div className = "search-books-input-wrapper" >
            <
            input type = "text"
            placeholder = "Search by title or author"
            value = { this.state.query }
            onChange = { event => this.updateQuery(event.target.value) }
            /> < /
            div > <
            /div>  <
            div className = "search-books-results" >
            <
            ol className = "books-grid" > {
                this.state.books.map(book =>
                    <
                    Book key = { book.id }
                    book = { book }
                    //update the book's shelf in the parent 
                    onShelfChange = { this.props.updateBook }
                    />
                )
            } <
            /ol> < /
            div > <
            /div>
        );
    }
}
export default SearchBooks;