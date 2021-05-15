import React, { Component } from 'react'
import Shelf from './BookShelf'
import PropTypes from 'prop-types';


class BookShelves extends Component {

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        updateBook: []
    }

    componentDidMount() {
        var { books } = this.props
        const { updateBook } = this.props

        if (books) {
            const currentlyReading = books.filter((book) => {
                return book.shelf === "currentlyReading"
            })


            const read = books.filter((book) => (
                book.shelf === "read"
            ))


            const wantToRead = books.filter((book) => (
                book.shelf === "wantToRead"
            ))

            this.setState({
                currentlyReading,
                read,
                wantToRead,
                updateBook
            })
        }
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf shelfName='Currently Reading' bookList={this.state.currentlyReading} updateBookHandler={this.state.updateBook} />
                        <Shelf shelfName='Want to Read' bookList={this.state.wantToRead} updateBookHandler={this.state.updateBook} />
                        <Shelf shelfName='Read' bookList={this.state.read} updateBookHandler={this.state.updateBook} />
                    </div>
                </div>
            </div>
        )
    }
}

BookShelves.propTypes = {
    books: PropTypes.object.isRequired,
};


export default BookShelves;