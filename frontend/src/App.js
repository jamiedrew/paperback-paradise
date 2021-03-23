import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Books from "./views/Books";
import GenreList from "./views/GenreList";
import BooksByGenre from "./views/BooksByGenre";

import './App.css';

function App() {
  return (
    <Router>

    <div className="App">
      <nav>
        <div className="navbar_store">
          <Link to="/books">Books</Link>
          <Link to="/genres">Genres</Link>
        </div>
        <div className="navbar_user">
          <p>Account</p>
          <p>Cart</p>
        </div>
      </nav>

      <header>
        <h1>Paperback Paradise</h1>
        <h2>The World's #1 Used Book Store</h2>
      </header>

      <main>
        <Route exact path="/books" component={Books} />
        <Route exact path="/genres" component={GenreList} />
        <Route exact path="/genres/:genre" component={BooksByGenre} />
        <Route exact path="/" component={Books} />
      </main>

      <footer>
        All content © <a href="https://www.instagram.com/paperbackparadise/" target="_blank" rel="noopener noreferrer">Paperback Paradise</a>
      </footer>

    </div>

  </Router>


    
  );
}

export default App;