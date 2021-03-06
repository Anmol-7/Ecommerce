import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Message from "../components/Message";
import CheckOutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  //calculate prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const totalQuantity = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
  cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 50;
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice));
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Row>
        <CheckOutSteps step1 step2 step3 step4 />
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}.
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col xs={3} sm={3} md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col xs={5} sm={4}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col xs={3} sm={5} md={4}>
                          <Row>
                            <NumberFormat
                              thousandSeparator={true}
                              thousandsGroupStyle="lakh"
                              prefix={"₹"}
                              displayType={"text"}
                              value={item.price * item.qty}
                            />
                          </Row>
                          <Row>Qty: {item.qty}</Row>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  {totalQuantity > 1 ? (
                    <Col>Price ({totalQuantity} items)</Col>
                  ) : (
                    <Col>Price ({totalQuantity} item)</Col>
                  )}
                  <Col>
                    <NumberFormat
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      prefix={"₹"}
                      displayType={"text"}
                      value={cart.itemsPrice}
                    />
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Delivery Charges</Col>
                  <Col>
                    {cart.shippingPrice > 0 ? (
                      <NumberFormat
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                        prefix={"₹"}
                        displayType={"text"}
                        value={cart.shippingPrice}
                      />
                    ) : (
                      "FREE"
                    )}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Amount Payable</Col>
                  <Col>
                    <NumberFormat
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      prefix={"₹"}
                      displayType={"text"}
                      value={cart.totalPrice}
                    />
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderScreen;
