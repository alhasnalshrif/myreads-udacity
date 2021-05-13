import React, { Component } from 'react'
import Book from './Book'
class BookShelf extends Component {

   state = {
        books: []
    }

    componentDidMount() {
        const { bookList } = this.props
        if (bookList.length > 0) {
            this.setState({
                books: bookList
            })
        }
    }
    render() {
         return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {(this.props.bookList).map((book) => (
                            <li key={book.id}>
                                <Book book={book} updateBookHandler={this.props.updateBookHandler} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

        )
    }
}

export default BookShelf;