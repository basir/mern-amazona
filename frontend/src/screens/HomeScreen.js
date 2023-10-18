import { useEffect, useReducer} from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/esm/Card'
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, featuredProducts: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_CATEGORIES":
        return { ...state, loading: true };
    case "CATEGORIES_SUCCESS":
        return { ...state, categories: action.payload, loading: false };
    case "CATEGORIES_FAIL":
        return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const navigate = useNavigate()
  const [{ loading, error, categories, featuredProducts }, dispatch] = useReducer(reducer, {
    //products: [],
    categories:[],
    featuredProducts:[],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
       // const result = await axios.get("/api/products/");
       // dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        const result = await axios.get('/api/products/featured')
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
///fetch categories
      dispatch({type: "FETCH_CATEGORIES"})
      try{
        const result = await (axios.get("/api/categories"))
        dispatch({type: "CATEGORIES_SUCCESS", payload: result.data})
      }catch(error){
        dispatch({type: 'CATEGORIES_FAIL', payload: error.message})
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>UGYARD.COM</title>
      </Helmet>
      <div>
        <div className="banner">
          <Row className="w-full">
            <Col sm={5}>
              <h1>JUST SELLING YOU EASE</h1>
              <p className="p-4"></p>
              <Button>Call Now</Button>
              </Col>
              <Col sm={7}>
                <img src="/images/b1.jpg" alt="banner" className="img-fluid" width={'500px'}/>
              </Col>
            </Row>
        </div>
      </div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row className="featured">
            {featuredProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Row className="my-3">
        <h1>Categories</h1>
        {categories?.map((category)=> (
          <Col md={6} xs={6} key={category._id} className="p-2" onClick={()=> navigate(`/category/${category._id}`)}>
          <Card className="d-grid justify-content-center">
            <Card.Img src={category.image} className="card-img-top" alt={category.name}/>
            <Button className="m-2">{category.name}</Button>
          </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default HomeScreen;
