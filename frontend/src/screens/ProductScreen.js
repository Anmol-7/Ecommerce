import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import NumberFormat from "react-number-format";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetail(match.params.id));
  }, [dispatch, match]);
  return (
    <>
      <Link to="/">
        <Button variant="outline-secondary" className="btn btn-light my-3 back">
          Go Back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col lg={3} md={6} sm={12}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroupItem>
                Price:{" "}
                <NumberFormat
                  thousandSeparator={true}
                  thousandsGroupStyle="lakh"
                  prefix={"₹"}
                  displayType={"text"}
                  value={product.price}
                />
              </ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="my-3">
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>
                        <NumberFormat
                          thousandSeparator={true}
                          thousandsGroupStyle="lakh"
                          prefix={"₹"}
                          displayType={"text"}
                          value={product.price}
                        />
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    disabled={product.countInStock === 0}
                    variant="dark"
                    className="btn-block addToCart"
                    type="button"
                    style={{ borderRadius: "4px" }}
                  >
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
