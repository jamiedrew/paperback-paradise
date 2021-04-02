import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = ({click, user}) => {
    return (
        <nav>
          <div className="navbar_store">
            <Link to="/books">Books</Link>
            <Link to="/genres">Genres</Link>
          </div>
          <div className="navbar_user">
            { user ? <p><FaUser /><Link to="/account"> {user.user_name}</Link></p> : <p><Link to="/auth/login">Log In</Link></p> }
            <p className="cart_link" onClick={click}><FaShoppingCart /> Cart</p>
          </div>
        </nav>
    )
}

export default Navbar;