import React, { useContext } from "react";
import { myContext } from "../App";
import "../App.css";
const Card = () => {
  const [cart, setCart] = useContext(myContext);
//   Claculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  //Calculate the total quantity
  const totalQuantity = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  //Function to increase the no. of items in the cart
  const handleInc = (id, quantity) => {
    setCart((items) => {
      return items.map((item) => {
        if (id === item.id) {
          return { ...item, quantity: item.quantity + 1 || quantity + 1 };
        } else {
          return item;
        }
      });
    });
  };

  //Function to decrease the no. of items in the cart
  const handleDec = (id, quantity) => {
    setCart((items) => {
      return items.map((item) => {
        if (id === item.id && quantity > 1) {
          return { ...item, quantity: item.quantity - 1 || quantity - 1 };
        } else {
          return item;
        }
      });
    });
  };
//Function to remove a item from cart
  const handleRemove = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };
  return (
    <>
    {/* Card to display total quantity and total price */}
    <div className="card total-card p-4 mb-5 h-100 bg-body-tertiary shadow">
        <ul className="list-group list-group-flush">
          <h1 className="text-center">Cart</h1>
          <hr />
          <h5>No of Items in Your Cart : {totalQuantity}</h5>
          <h3> Grand Total : ${totalPrice}</h3>
        </ul>
      </div>
      {/* Card to display the items in cart */}
      {cart.map((item) => {
        return (
          <div
            className="card mb-5 p-4 bg-body-tertiary shadow"
            style={{ width: "60vw" }}
            key={item.id}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={item.images[0]}
                  className="img-fluid rounded-start immage"
                  alt="..."
                  style={{ height: "250px" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body text-start">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <b>Price: </b>${item.price}
                  </p>

                  <div className="quantity-btn">
                    <span className="card-text">
                      <b>Quantity: </b>
                    </span>
                    <button
                      className="btn btn-outline-success quantity-button mt-2 mx-3"
                      onClick={() => handleInc(item.id, item.quantity || 1)}
                    >
                      +
                    </button>
                    <span className="badge text-bg-dark rounded-pill">
                      {item.quantity || 1}
                    </span>
                    <button
                      className="btn btn-outline-success quantity-button mt-2 mx-3"
                      onClick={() => handleDec(item.id, item.quantity || 1)}
                    >
                      -
                    </button>
                  </div>
                  <button
                  className="btn btn-danger mt-3"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
                </div>
                
              </div>
            </div>
            <hr></hr>
            <p>
              <b>Shipping : </b>FREE
            </p>
            <h5>SubTotal : ${item.price * (item.quantity || 1)}</h5>
          </div>
        );
      })}
    </>
  );
};

export default Card;
