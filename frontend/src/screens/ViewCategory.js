import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import CategoryProduct from '../components/CategoryProduct';
import Row from 'react-bootstrap/esm/Row';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const reducer = (state, action)=> {
    switch(action.type){
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, category: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
}

export default function ViewCategory() {

    const params = useParams()
    const {id: categoryId } = params;

    const [{loading, error, category}, dispatch] = useReducer(reducer, {
        category: [],
        loading: true,
        error: ""
    })

    useEffect(()=> {
    dispatch({type: 'FETCH_REQUEST'});
        const fetchData = async()=> {
        try{
            const result = await axios.get(`/api/categories/${categoryId}`)
            dispatch({type: "FETCH_SUCCESS", payload: result.data})
            
        } catch(error){
            dispatch({type: "FETCH_FAIL", payload: error.message})
        }}
        fetchData()
    },[categoryId])
  return (
   loading ? (
    <LoadingBox />
   ) : error ? (
    <MessageBox>{error}</MessageBox>
   ):(
    <>
        <h1>{category.name}</h1>
        <Row>
            { category && category.products && category.products.map((product)=>(
                <Col md={4} key={product._id}>
                <CategoryProduct product={product}></CategoryProduct>
                </Col>
            ))}
        </Row>
    </>
   )
  )
}
