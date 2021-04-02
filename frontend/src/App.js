import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";

import Books from "./views/Books";
import GenreList from "./views/GenreList";
import BooksByGenre from "./views/BooksByGenre";
import Cart from "./views/Cart";
import Account from "./views/Account";
import Checkout from "./views/Checkout";
import OrderConfirmation from "./views/OrderConfirmation";

import Login from "./views/Login";
import Register from "./views/Register"

import './App.css';

function App() {

  const [ showCart, setShowCart ] = useState(false);
  const [ user, setUser ] = useState();

  useEffect(() => {
    // retrieve user details
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const currentUser = JSON.parse(loggedInUser);
      setUser(currentUser);
    }

  }, []);

  // console.log(user);

  return (
    <Router>
      <Cart show={showCart} click={() => setShowCart(false)} />

      <div className="App">
        <Navbar click={() => setShowCart(!showCart)} user={user} />

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
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/register" component={Register} />

            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/order-confirmed" component={OrderConfirmation} />

            <Redirect from="/auth/logout" to="/" />

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