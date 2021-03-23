import "./Item.css";

const Item = ({ title, author, price, cover }) => {
    console.log(cover);

    return (
        <div className="item">
            <div className="cover">
                <img src={`/covers/${cover}.jpg`} alt="" />
            </div>
            <div className="info">
                <h4>{title}</h4>
                <h5>{author}</h5>
                <p><span className="price">£{price}.00</span></p>
                <button>Add To Cart</button>
            </div>
        </div>
    );
}

export default Item;