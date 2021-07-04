import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 border-0 rounded shadow p-3 mb-5 bg-white rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text as="div"></Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
