// import React, { useContext } from 'react'
// import { Col, ListGroup, Row } from 'react-bootstrap';
// import { Button } from 'react-bootstrap/lib/inputgroup';
// import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom';
// import MessageBox from '../components/MessageBox';
// import { Store } from '../Store';

// export default function CartScreen() {
//     const { state, dispatch: ctxDispatch } = useContext(Store);
//     const { cart: { cartItems }, } = state;
//     return (
//         <div>
//             <Helmet>
//                 <title>Product Cart</title>
//             </Helmet>
//             <h1>Produt Cart</h1>
//             <Row>
//                 <Col md={8}>
//                     {cartItems.length === 0 ? (
//                         <MessageBox>
//                             keranjang kosong. <Link to='/'>Ayo di order</Link>
//                         </MessageBox>
//                     ) :
//                         (
//                             <ListGroup>
//                                 {cartItems.map((item) => (
//                                     <ListGroup.Item key={item._id}>
//                                         <Row className='align-items-center'>
//                                             <Col md={4}>
//                                                 <img
//                                                     src={item.image}
//                                                     alt={item.name}
//                                                     className='img-fluid rounded img-thumbnail'
//                                                 ></img>{' '}
//                                                 <Link to={`/product/${item.slug}`}>{item.name}</Link>
//                                             </Col>
//                                             <Col md={3}>
//                                                 <Button variant='light' disabled={item.quantity === 1}>
//                                                     <i className='fas fa-minus-circle'></i>
//                                                 </Button>{' '}
//                                                 <span>{item.quantity}</span>
//                                                 <Button variant='light' disabled={item.quantity === 1}>
//                                                     <i className='fas fa-plus-circle'></i>
//                                                 </Button>
//                                             </Col>
//                                             <Col md={3}>Rp. {item.price}</Col>
//                                             <Col md={2}>
//                                                 <Button variant='light'>
//                                                     <i className='fas fa-trash'></i>
//                                                 </Button>
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                 ))}
//                             </ListGroup>
//                         )}
//                 </Col>
//                 <Col md={4}></Col>
//             </Row>
//         </div>
//     )
// }

import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`https://food-server-production.up.railway.app/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Maaf. product yang anda pilih habis');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };

    return (
        <div>
            <Helmet>
                <title>Product Cart</title>
            </Helmet>
            <h1>Product Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">ayo buruan order </Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                            ></img>{' '}
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button onClick={() =>
                                                updateCartHandler(item, item.quantity - 1)
                                            } variant="light" disabled={item.quantity === 1}>
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    updateCartHandler(item, item.quantity + 1)
                                                }
                                                disabled={item.quantity === item.countInStock}
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>${item.price}</Col>
                                        <Col md={2}>
                                            <Button 
                                                onClick={() => removeItemHandler(item)}
                                                variant="light"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : Rp.
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={checkoutHandler}
                                            disabled={cartItems.length === 0}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}