import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layouts/AdminLayout';
import Settings from './features/Settings';
import AddSlider from './features/Slider/AddSlider';
import Sliders from './features/Slider/Sliders';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import Login from './pages/auth/Login';
import AllBrands from './pages/brand/AllBrands';
import CreateBrand from './pages/brand/CreateBrand';
import EditBrand from './pages/brand/EditBrand';
import AllCategories from './pages/category/AllCategories';
import CreateCategory from './pages/category/CreateCategory';
import EditCategory from './pages/category/EditCategory';
import ContactCustomers from './pages/contact-customers/ContactCustomers';
import AllCoupons from './pages/coupon/AllCoupons';
import CreateCoupon from './pages/coupon/CreateCoupon';
import EditCoupon from './pages/coupon/EditCoupon';
import Orders from './pages/order/Orders';
import AllProducts from './pages/product/AllProducts';
import CreateProduct from './pages/product/CreateProduct';
import Users from './pages/user/Users';


function App() {
  return (
    <>
  {/* <LanguageSwitcher /> */}
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

             {/* catch all unmatched routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
            
            {/* Brand */}
            <Route path='brand/create' element={<CreateBrand />} />
            <Route path='brands' element={<AllBrands />} />
            <Route path='brand/:id/edit' element={<EditBrand />} />

            <Route path='product/create' element={<CreateProduct />} />
            <Route path='products' element={<AllProducts />} />

            {/* Category */}
            <Route path='category/create' element={<CreateCategory />} />
            <Route path='categories' element={<AllCategories />} />
            <Route path='category/edit/:id' element={<EditCategory />} />

            <Route path='orders' element={<Orders />} />
            <Route path='slider/create' element={<AddSlider />} />
            <Route path='sliders' element={<Sliders />} />

            {/* Coupon */}
            <Route path='coupon/create' element={<CreateCoupon />} />
            <Route path='coupons' element={<AllCoupons />} />
            <Route path='coupon/edit/:id' element={<EditCoupon />} />

            <Route path='users' element={<Users />} />

            <Route path='contact-customers' element={<ContactCustomers />} />

            <Route path='settings' element={<Settings />} />

          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
