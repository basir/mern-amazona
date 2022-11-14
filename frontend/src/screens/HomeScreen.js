import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
//import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import Carousel from 'react-bootstrap/Carousel'
import InfiniteScroll from 'react-infinite-scroll-component'
import banner2 from '../images/banner2.png'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer((reducer), {
    products: [],
    loading: true,
    error: '',
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
          className='d-block w-100'
          src={banner2}
          alt='slide one'
          />
        </Carousel.Item>
{/*         <Carousel.Item>
          <img
          className='d-block w-100'
          src={banner2}
          alt='slide two'
          />
        </Carousel.Item> */}
      </Carousel>

        <h1 className='featured'>Featured</h1>

        <div className="products">

          <InfiniteScroll
          dataLength={products.length}
          hasMore={true}
          next={products.fetchMoreData}
          >
            <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={4} className="mb-3">
                <Product product={product}></Product>
              </Col>
            )).reverse()}
            </Row>
          </InfiniteScroll>
        
      </div>
      
    </div>
  )
}
