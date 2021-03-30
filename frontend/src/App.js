import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";

import { FaShoppingCart } from "react-icons/fa";

import Books from "./views/Books";
import GenreList from "./views/GenreList";
import BooksByGenre from "./views/BooksByGenre";
import Cart from "./views/Cart";
import Account from "./views/Account";

import './App.css';

function App() {

  const [ showCart, setShowCart ] = useState(false);

  return (
    <Router>
      <Cart show={showCart} />

      <div className="App">
        <nav>
          <div className="navbar_store">
            <Link to="/books">Books</Link>
            <Link to="/genres">Genres</Link>
          </div>
          <div className="navbar_user">
            <Link to="/account">Account</Link>
            <p className="cart_link" onClick={() => setShowCart(!showCart)}><FaShoppingCart /> Cart</p>
          </div>
        </nav>

        <header>
          <h1>Paperback Paradise</h1>
          <h2>The World's #1 Used Book Store</h2>
        </header>
        
        <main>
          <Switch>
            <Route exact path="/books" component={Books} />
              <Route exact path="/genres" component={GenreList} />
              <Route exact path="/genres/:genre" component={BooksByGenre} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/" component={Books} />
          </Switch>
        </main>

        <footer>
          All content © <a href="https://www.instagram.com/paperbackparadise/" target="_blank" rel="noopener noreferrer">Paperback Paradise</a>
        </footer>

    </div>

    </Router>
  );
}

export default App;