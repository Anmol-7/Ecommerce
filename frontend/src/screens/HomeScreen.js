import React, { useEffect } from "react";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products.length !== 0 ? (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={6} lg={4} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <p>
          Umm...No results found for "
          <strong className="font-weight-bold text-uppercase">{keyword}</strong>
          ".{" "}
          <strong>
            <Link to="/">Go Back.</Link>
          </strong>
        </p>
      )}
    </>
  );
};

export default HomeScreen;
