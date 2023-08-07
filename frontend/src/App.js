import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
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
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

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
    <BrowserRouter >
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

        <ToastContainer position="top-center" limit={1}  />
        <header>
        <Navbar className="w-100" expand="lg" style={{backgroundColor:"#0b3954", height:"90px", zIndex:"999", position: "fixed", top: "0" }}>


      
            <Container style={{backgroundColor:"#0b3954"}}>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>



              <Navbar.Toggle  ria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />


                <Nav className="me-auto  w-100  justify-content-end"  >
                <LinkContainer style={{ fontSize: "30px", fontStyle: "normal", color: "#FFFF" }} to="/">
                      <Navbar.Brand>AMAZON</Navbar.Brand>
                </LinkContainer>
                
                </Nav>



                <Nav className="me-auto  w-100  justify-content-end" style={{color:"white"}} >
                  <Link style={{color:"white", fontStyle:"normal"}} to="/cart" className="nav-link">
                    <i className='fa fa-shopping-basket'></i>&nbsp;
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>


                  
             
                  {userInfo ? (
                    <NavDropdown style={{zIndex:"999"}} title={<span style={{color: 'white', fontStyle: 'normal'}}>{userInfo.name}</span>} id="basic-nav-dropdown">

                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profil</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Sipariş Geçmişi</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                       
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                        
                      >
                        Çıkış
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link  style={{color:"white", fontStyle:"normal"}}  className="nav-link" to="/signin">
                      Giriş
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                  <NavDropdown  title={<span style={{color: 'white', fontStyle: 'normal'}}>Admin</span>} id="admin-nav-dropdown">

                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Panel</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Ürünler</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Siparişler</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Kullanıcılar</NavDropdown.Item>
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
     <Nav className="flex-column text-white w-100 p-5"  style={{position: "sticky", top:0}} >
    <Nav.Item style={{color:"#ffffff", fontStyle:"normal"}}>
        <strong>Kategoriler</strong>
    </Nav.Item>
    {categories.map((category) => (
        <Nav.Item style={{color:"#ffffff"}} key={category}>
            <LinkContainer 
                to={{ pathname: '/search', search: `category=${category}` }}
                onClick={() => setSidebarIsOpen(false)}
                style={{color:"#ffffff"}}
            >
                <Nav.Link >{category}</Nav.Link>
            </LinkContainer>
        </Nav.Item>
    ))}
</Nav>

        </div>
        <main style={{marginTop:"125px"}}>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/forget-password"
                element={<ForgetPasswordScreen />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordScreen />}
              />

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
        <footer style={{ backgroundColor: "#0b3954", padding: "20px", marginTop: "auto", color:"white" }}>
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <h5>Kategoriler</h5>
        <ul className="list-unstyled">
          {/* Category links - Column 1 */}
          {categories.slice(0, 5).map((category) => (
            <li key={category}>
              <a style={{color:"#bde0fe"}}  href={`/search?category=${category}`}>{category}</a>
            </li>
          ))}
        </ul>
      </div>
    
      <div className="col-md-4">
        <h5>&nbsp;</h5>
        <ul className="list-unstyled">
          {/* Category links - Column 2 */}
          {categories.slice(5, 10).map((category) => (
            <li key={category}>
              <a  style={{color:"#bde0fe"}}  href={`/search?category=${category}`}>{category}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-4">
        <h5>İletişim Bilgileri</h5>
        <ul className="list-unstyled">
          {/* Contact information */}
          <li>Adres: İstanbul, Türkiye</li>
          <li>Telefon: 123456789</li>
          <li>E-posta: amazon@example.com</li>
        </ul>
      </div>
    </div>
    <hr />
    <div className="text-center">
      {/* Social media icons */}
      <div className="social-icons" style={{color:"#bde0fe"}}>
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-pinterest"></i></a>
      </div>
      {/* Links for Sepet and Giriş/Çıkış */}
      <ul className="list-inline">
        <li className="list-inline-item">
          <a style={{color:"#bde0fe"}} href="/cart">Sepet</a>
        </li>
        <li className="list-inline-item">
          <a style={{color:"#bde0fe"}} href="/giris">Giriş</a> / <a style={{color:"#bde0fe"}} href="/cikis">Çıkış</a>
        </li>
      </ul>
      <p>Tüm hakları saklıdır &copy; {new Date().getFullYear()}</p>
    </div>
  </div>
</footer>


      </div>
    </BrowserRouter>
  );
}

export default App;
