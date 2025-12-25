import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layouts/AdminLayout';
import AddSlider from './features/Slider/AddSlider';
import Settings from './features/Slider/Settings';
import Sliders from './features/Slider/Sliders';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import Login from './pages/auth/Login';
import AllBrands from './pages/brand/AllBrands';
import CreateBrand from './pages/brand/CreateBrand';
import AllCategories from './pages/category/AllCategories';
import CreateCategory from './pages/category/CreateCategory';
import AllCoupons from './pages/coupon/AllCoupons';
import CreateCoupon from './pages/coupon/CreateCoupon';
import Orders from './pages/order/Orders';
import AllProducts from './pages/product/AllProducts';
import CreateProduct from './pages/product/CreateProduct';
import Users from './pages/user/Users';


function App() {
  return (
    <>

    <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path='/' element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>

            <Route index element={<Dashboard />} />
            <Route path='brand/create' element={<CreateBrand />} />
            <Route path='brands' element={<AllBrands />} />
            <Route path='product/create' element={<CreateProduct />} />
            <Route path='products' element={<AllProducts />} />
            <Route path='category/create' element={<CreateCategory />} />
            <Route path='categories' element={<AllCategories />} />
            <Route path='orders' element={<Orders />} />
            <Route path='slider/create' element={<AddSlider />} />
            <Route path='sliders' element={<Sliders />} />
            <Route path='coupon/create' element={<CreateCoupon />} />
            <Route path='coupons' element={<AllCoupons />} />
            <Route path='users' element={<Users />} />
            <Route path='settings' element={<Settings />} />

          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
