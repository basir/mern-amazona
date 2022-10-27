import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import LOGO from './images/binarii.png'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import Shopscreen from './screens/Shopscreen';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';




function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const date = new Date()


  
  
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };


  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
  
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header className='header-nav'>
          <Navbar bg="light" variant="light" expand="lg" className='nav-menu'>
      
            <Container>
              
              <Button
                variant="light btn-lg"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>

          <Navbar.Brand>
          <Link to={'/'}>
          <img
          className=' brand fluid d-inline-block align-top fluid'
          width={200}
          height={120}
          alt={'logo'}
          src={LOGO}/>
          </Link>

          </Navbar.Brand>

              
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                  <i className='fas fa-shopping-cart'/>
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  <Link  className='nav-link' to='#' onClick={(e)=>{window.location.href='mailto:info@binarymall.net'; e.preventDefault()}}>
                    Support
                  </Link>
                  <Link  className='nav-link' to='#' onClick={(e) =>{window.location.href='tel:+256756613319'}}>
                    Hotline
                  </Link>
                  {/**<Link  className='nav-link' to='/'>
                    Custom
                  </Link>
                  <NavDropdown title='Countries' id='basic-nav-dropdown'>
                   <LinkContainer to='/shop'>
                    <NavDropdown.Item>United States</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to='/search'>
                    <NavDropdown.Item>GCC</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to='/search'>
                    <NavDropdown.Item>India</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to='/search'>
                    <NavDropdown.Item>Europe</NavDropdown.Item>
                   </LinkContainer>
                    </NavDropdown>**/}
                  {userInfo ? (
                    
                    <NavDropdown title={ userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <Link to='/'>
              <i className="fa fa-home" aria-hidden="true">HOME</i>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link className='categLink'>{category.toUpperCase()}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        
        {/*<LinkContainer to="/" className='logo-container'>
                <Navbar.Brand>
                  <img src={logo} className='logo'/>
                </Navbar.Brand>
            </LinkContainer>*/}
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path='/shop' element={<Shopscreen />}/>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>

        <footer className='p-y-4 justify-content-center Footer'>
          <Row className='footer-row'>
          <Col sm={6} md={4} lg={3}>
            <h5>Contact Us</h5>
            <ul className='list-group'> 
                <li>Email: <span>info@binarymall.net</span></li>
                <li>Phone: <span>+256782144414</span></li>
                <li>Phone: <span>+256701583150</span></li>
                <li>Address: <span>Namungoona Nakibinge Road \n<br/>Metropolitan University</span></li>
                <li>Operating: <span>Mon - Sun</span></li>
                <li>Hours: <span>24(GMT+3) </span></li>
            </ul>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <h5>Our Services</h5>
            <ul className='list-group'> 
                <li>Retail</li>
                <li>Trade</li>
                <li>Brand Development</li>
                <li>Advertisment</li>
                <li>Events</li>
            </ul>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <h5>Quick Links</h5>
            <ul className='list-group'> 
                <li>Carrers</li>
                <li>Become Supplier</li>
                <li>Become Seller</li>
                <li>Advertisment</li>
                <li>Become Partner</li>
            </ul>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <h5>Socials</h5>
            <ul className='list-group'> 
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Pinterest</li>
                <li>Twitter</li>
                <li>Linked In</li>
            </ul>
          </Col>
          </Row>
        </footer>
        <div className='text-center'> Product Under Test Mode</div>
        <div className='text-center'>copyright &copy; {date.getFullYear()}</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
