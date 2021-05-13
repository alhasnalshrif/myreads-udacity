import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class Search extends Component {

  state = {
    query: '',
    booksToDisplay: [], 
       invalidQuery: false
  }

  search = async (e) => {
    const searchQuery = e.target.value
    this.setState({
      query: searchQuery,
      invalidQuery: false
    })

    if (searchQuery === '') {
      this.setState({ booksToDisplay: [] })
    }

    else {

      await this.props.searchBooks(searchQuery)
      this.setState({ booksToDisplay: this.props.searchResults })
      const { query, booksToDisplay } = this.state
      if ((booksToDisplay.length === undefined || booksToDisplay.length === 0) && query.length !== 0) {
        this.setState({
          invalidQuery: true
        })
      }
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {

    const { query, booksToDisplay, invalidQuery } = this.state

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to={'/'} onClick={this.clearQuery}><button className="close-search">Close</button></Link>
            <div className="search-books-input-wrapper">



              <input type="text" value={query} placeholder="Search by title or author"
                onChange={(event) => this.search(event)} />
            </div>
          </div>

          <div className="search-books-results">
            <ol className="books-grid">
              {booksToDisplay.length > 0 && booksToDisplay.map((book) => (
                <Book key={book.id} book={book} updateBookHandler={this.props.updateBook} />
              ))}
              {invalidQuery && <p>Sorry, no books found</p>}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;