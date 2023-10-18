 import { useContext } from 'react'
import { Store } from '../Store'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

function Accessory(props) {
    const {accessory} = props

    const {state, dispatch: ctxDispatch}= useContext(Store)
    const {cart: {cartItems}} = state


  /*   const updateCartHandler = async(item, quantity)=> {
      const {data} = await axios.get(`/api/accessories/${item.accessory}`)
      if (data.iStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
    }   */

    const addToCartHandler = async(item)=> {
        const existItem = cartItems.find((x)=> x._id === accessory.accessory._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const data  = axios.get(`/api/accessories/${item.accessory}`);

        if(data.inStock < quantity){
            window.alert('Sold Out')
            return
        }
        ctxDispatch({
            type: 'CART_ADD_ACCESSORY',
            payload: {...item, quantity}
        })
    }
  return ( 
  <Card>
        <Link>
        <img src={accessory.photo} className='card-img-top' alt={accessory.name}/>
        </Link>
        <Card.Body className='card-info'>
            <Card.Text>{accessory.name}</Card.Text>
            <Card.Text>AED: {accessory.price}</Card.Text>
            {accessory.inStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Row>
          <Col onClick={()=> addToCartHandler(accessory, accessory.quantity + 1)}>
            <i className="fas fa-plus-circle"></i>
          </Col>
          <Col>{accessory.quantity}</Col>
          <Col onClick={()=> addToCartHandler(accessory, accessory.quantity -  1)}>
            <i className="fas fa-minus-circle"></i>
          </Col>
        </Row>
        )}
        </Card.Body> 
    </Card>
  )
}

export default Accessory 