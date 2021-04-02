import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { getOrders as listUserOrders } from "../redux/actions/orderActions"
import axios from "axios";

import "./Account.css";

const Account = () => {

    const dispatch = useDispatch();
    const getOrders = useSelector(state => state.getOrders);
    const { orders, loading, error } = getOrders;
    console.log(orders);

    useEffect(() => { dispatch(listUserOrders()) }, []);

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user")));

    let history = useHistory();

    const logout = async () => {
        axios.post("/auth/logout");

        setUser({});
        localStorage.clear();

        history.push("/books");
        window.location.reload();
    }

    if (!user) {
        return <Redirect to="/auth/login" />
    } else {
        return (
            <div id="user_account">
                {/* show if logged in, else redirect */}
                    <h3>{user.user_name}'s Account</h3>
                    <button onClick={logout}>Log Out</button>

                    <div className="orders">
                        <h4>Order History</h4>

                        <table>
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                            { loading ? 
                                <tr>Loading...</tr>
                                : error ? 
                                    <tr>{error}</tr> 
                                    : orders.length > 0 ? 
                                        orders.map(order => 
                                            <tr key={order.order_id}>
                                                <td>{order.title}</td>
                                                <td>{order.date_created.substring(0, 10)}</td>
                                                <td>{order.status}</td>
                                            </tr> ) 
                                        : <tr><td>No orders from {user.user_name}</td></tr>}
                                
                            </tbody>
                        </table>
                    </div>
            </div>
        )

    }
}

export default Account;