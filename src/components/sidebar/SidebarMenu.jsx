import { Link, useLocation } from 'react-router-dom';

const SidebarMenu = () => {

  const location  = useLocation();
  // console.log(location);
  const path = location.pathname;
  // console.log('path', path);

  return (
    <>
      <div className="section-menu-left">
        <div className="box-logo">
          <Link to="/" id="site-logo-inner">
            <img
              className=""
              id="logo_header"
              alt="Site Logo"
              src="../../images/logo/logo.png"
              data-light="images/logo/logo.png"
              data-dark="images/logo/logo.png"
            />
          </Link>
          <div className="button-show-hide">
            <i className="icon-menu-left"></i>
          </div>
        </div>
        <div className="center">
          <div className="center-item">
            <div className="center-heading">Main Home</div>
            <ul className="menu-list">
              <li className={`menu-item ${path === '/' ? 'active' : ''}`}>
                <Link to='/' className="">
                  <div className="icon"><i className="icon-grid"></i></div>
                  <div className="text">Dashboard</div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="center-item">
            <ul className="menu-list">

              {/* Product Sections */}
              
              <li className={`menu-item ${path === '/product/create' ? 'active' : ''}`}>
                <Link to="/product/create" className="">
                  <div className="icon"><i className="icon-shopping-cart"></i></div>
                  <div className="text">New Product</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/products' ? 'active' : ''}`}>
                <Link to="/products" className="">
                  <div className="icon"><i className="icon-shopping-cart"></i></div>
                  <div className="text">All Products</div>
                </Link>
              </li>

              {/* END Product Section */}

              <hr />

              {/* Brand Sections */}

              <li className={`menu-item ${path === '/brand/create' ? 'active' : ''}`}>
                <Link to="/brand/create" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">New Brand</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/brands' ? 'active' : ''}`}>
                <Link to="/brands" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">All Brands</div>
                </Link>
              </li>

              {/* END Brand Section */}

              <hr />

              {/* Category Sections */}

              <li className={`menu-item ${path === '/category/create' ? 'active' : ''}`}>
                <Link to="/category/create" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">New Category</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/categories' ? 'active' : ''}`}>
                <Link to="/categories" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">All Categories</div>
                </Link>
              </li>

              {/* END Category Section */}

              <hr />

              {/* Order Sections */}

              <li className={`menu-item ${path === '/orders' ? 'active' : ''}`}>
                <Link to="/orders" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">All Orders</div>
                </Link>
              </li>

              {/* END Order Section */}

              <hr />

              <li className={`menu-item ${path === '/slider/create' || path === '/sliders' ? 'active' : ''}`}>
                <Link to='/sliders' className="">
                  <div className="icon"><i className="icon-image"></i></div>
                  <div className="text">Slider</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/coupon/create' || path === '/coupons' ? 'active' : ''}`}>
                <Link to="/coupons" className="">
                  <div className="icon"><i className="icon-grid"></i></div>
                  <div className="text">Coupons</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/users' ? 'active' : ''}`}>
                <Link to="/users" className="">
                  <div className="icon"><i className="icon-user"></i></div>
                  <div className="text">User</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/settings' ? 'active' : ''}`}>
                <Link to='/settings' className="">
                  <div className="icon"><i className="icon-settings"></i></div>
                  <div className="text">Settings</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarMenu