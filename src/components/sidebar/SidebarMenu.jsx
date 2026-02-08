import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const SidebarMenu = () => {

  const {t} = useTranslation();
  const location  = useLocation();
  const path = location.pathname;

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
            <div className="center-heading">{t("main_homepage")}</div>
            <ul className="menu-list">
              <li className={`menu-item ${path === '/' ? 'active' : ''}`}>
                <Link to='/' className="">
                  <div className="icon"><i className="icon-grid"></i></div>
                  <div className="text">{t("dashboard")}</div>
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
                  <div className="text">{t("new_products")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/products' ? 'active' : ''}`}>
                <Link to="/products" className="">
                  <div className="icon"><i className="icon-shopping-cart"></i></div>
                  <div className="text">{t("all_products")}</div>
                </Link>
              </li>

              {/* END Product Section */}

              <hr />

              {/* Brand Sections */}

              <li className={`menu-item ${path === '/brand/create' ? 'active' : ''}`}>
                <Link to="/brand/create" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">{t("new_brand")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/brands' ? 'active' : ''}`}>
                <Link to="/brands" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">{t("all_brands")}</div>
                </Link>
              </li>

              {/* END Brand Section */}

              <hr />

              {/* Category Sections */}

              <li className={`menu-item ${path === '/category/create' ? 'active' : ''}`}>
                <Link to="/category/create" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">{t("new_category")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/categories' ? 'active' : ''}`}>
                <Link to="/categories" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">{t("all_categories")}</div>
                </Link>
              </li>

              {/* END Category Section */}

              <hr />

              {/* Sub Category Sections */}

              <li className={`menu-item ${path === '/subcategory/create' ? 'active' : ''}`}>
                <Link to="/subcategory/create" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">{t("new_subcategory")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/subcategories' ? 'active' : ''}`}>
                <Link to="/subcategories" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">{t("all_subcategories")}</div>
                </Link>
              </li>

              {/* END  Sub Category Section */}

              <hr />

              {/* Order Sections */}

              <li className={`menu-item ${path === '/orders' ? 'active' : ''}`}>
                <Link to="/orders" className="">
                  <div className="icon"><i className="icon-layers"></i></div>
                  <div className="text">{t("all_orders")}</div>
                </Link>
              </li>

              {/* END Order Section */}

              <hr />

              <li className={`menu-item ${path === '/slider/create' || path === '/sliders' ? 'active' : ''}`}>
                <Link to='/sliders' className="">
                  <div className="icon"><i className="icon-image"></i></div>
                  <div className="text">{t("banner_slider")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/coupon/create' || path === '/coupons' ? 'active' : ''}`}>
                <Link to="/coupons" className="">
                  <div className="icon"><i className="icon-grid"></i></div>
                  <div className="text">{t("coupons")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/users' ? 'active' : ''}`}>
                <Link to="/users" className="">
                  <div className="icon"><i className="icon-user"></i></div>
                  <div className="text">{t("all_users")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/contact-customers' ? 'active' : ''}`}>
                <Link to="/contact-customers" className="">
                  <div className="icon"><i className="icon-user"></i></div>
                  <div className="text">{t("all_contact_customers")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/settings' ? 'active' : ''}`}>
                <Link to='/settings' className="">
                  <div className="icon"><i className="icon-settings"></i></div>
                  <div className="text">{t("account_setting")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/newsletters' ? 'active' : ''}`}>
                <Link to='/newsletters' className="">
                  <div className="icon"><i className="icon-grid"></i></div>
                  <div className="text">{t("newsletters")}</div>
                </Link>
              </li>

              <li className={`menu-item ${path === '/site-setting' ? 'active' : ''}`}>
                <Link to='/site-setting' className="">
                  <div className="icon"><i className="icon-settings"></i></div>
                  <div className="text">{t("site_setting")}</div>
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