import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'
import BookShelves from './BookShelves'


class BooksApp extends React.Component {

  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {

    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      })
  }


  updateBookStatus = async (book, shelf) => {
    await BooksAPI.update(book, shelf)

    let updatedBookList = await BooksAPI.getAll()
    this.setState({
      books: updatedBookList
    })
  }


  onSearchQueryChange = async (query) => {
    if (query.length > 0) {
      try {
        let searchResults = await BooksAPI.search(query);
        let books = this.state.books
     
        for (var i = 0; i < searchResults.length; i++) {
          for (var j = 0; j < books.length; j++) {

            if (searchResults[i].id === books[j].id) {

              searchResults[i].shelf = books[j].shelf;
            }
          }
        }
        this.setState({
          searchResults
        })
      }
      catch (error) {

        console.log(error)
      }
    }
    else {
      this.setState({ searchBooks: [] })
    }
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <div className="open-search">
          <Link to='/search'><button>Add a Book</button></Link>
        </div>
        <Route path='/search'
          render={() => <Search
            searchBooks={this.onSearchQueryChange} 
            searchResults={this.state.searchResults}
            updateBook={this.updateBookStatus} />}  
        />

        <Route exact path='/' component={() => <BookShelves books={books} updateBook={this.updateBookStatus} />} />
      </div>
    )
  }
}
export default BooksApp