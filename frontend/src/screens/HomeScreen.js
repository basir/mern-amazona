import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
//import logger from 'use-reducer-logger';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
//import LoadingBox from '../components/LoadingBox';
//import MessageBox from '../components/MessageBox';
import Startscreen from '../components/StartScreen';
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

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
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
      <Helmet>
        <title>Chateau des fleurs</title>
      </Helmet>
    
      <div className='second-wrapper'>
        <Startscreen />
        </div>
    </div>

  );
}
export default HomeScreen;
