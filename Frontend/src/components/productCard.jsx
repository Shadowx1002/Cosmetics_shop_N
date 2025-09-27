

export default function ProductCard(props){
    return(
        <div className="card">

            <img src={props.picture} alt="" className="productImg" />
            <h1>{props.name}</h1>
            

            <p>{props.description}</p>
            <h2>Price ${props.price}</h2>
            
            <button className="addToCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
        </div>
    )
}