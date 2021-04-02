// import { Link } from "react-router-dom";

const OrderConfirmation = ({ items }) => {
    return (
        <div className="order_confirmation">
            <h3>Thank you for your order!</h3>

            { (items) && <p>You had orders.</p> } 
            {/* details about yr order go here */}
        </div>
    )
}

export default OrderConfirmation;