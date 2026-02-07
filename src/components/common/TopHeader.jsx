import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import LanguageDropdown from '../LanguageDropdown';

const TopHeader = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    swal({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      buttons: ["Cancel", "Yes, log me out!"],
      dangerMode: true,
    })
    .then(willLogout => {
      if (willLogout) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          swal("Logged out!", "You have been successfully logged out.", "success");
          setTimeout(() => {
            navigate('/login');
          }, 2000);

          // .then(() => {
          //   navigate('/login'); // Redirect to login page
          // });
      }
    });

  }

  return (
    <>
      <div className="header-dashboard">
        <div className="wrap">
          <div className="header-left">
            <Link to=''>
              <img
                className=""
                id="logo_header_mobile"
                alt=""
                src="images/logo/logo.png"
                data-light="images/logo/logo.png"
                data-dark="images/logo/logo.png"
                data-width="154px"
                data-height="52px"
                data-retina="images/logo/logo.png"
              />
            </Link>
            <div className="button-show-hide">
              <i className="icon-menu-left"></i>
            </div>

            <form className="form-search flex-grow">
              <fieldset className="name">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="show-search"
                  name="name"
                  tabIndex="2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-required="true"
                  required=""
                />
              </fieldset>
              <div className="button-submit">
                <button className="" type="submit">
                  <i className="icon-search"></i>
                </button>
              </div>
              <div className="box-content-search" id="box-content-search">
                <ul className="mb-24">
                  <li className="mb-14">
                    <div className="body-title">Top selling product</div>
                  </li>
                  <li className="mb-14">
                    <div className="divider"></div>
                  </li>
                  <li>
                    <ul>
                      <li className="product-item gap14 mb-10">
                        <div className="image no-bg">
                          <img src="images/products/17.png" alt="" />
                        </div>
                        <div
                          className="flex items-center justify-between gap20 flex-grow"
                        >
                          <div className="name">
                            <Link to='' className="body-text">Dog Food Rachael Ray Nutrish®</Link>
                          </div>
                        </div>
                      </li>
                      <li className="mb-10">
                        <div className="divider"></div>
                      </li>
                      <li className="product-item gap14 mb-10">
                        <div className="image no-bg">
                          <img src="images/products/18.png" alt="" />
                        </div>
                        <div
                          className="flex items-center justify-between gap20 flex-grow"
                        >
                          <div className="name">
                            <Link to='' className="body-text">Natural Dog Food Healthy Dog Food</Link>
                          </div>
                        </div>
                      </li>
                      <li className="mb-10">
                        <div className="divider"></div>
                      </li>
                      <li className="product-item gap14">
                        <div className="image no-bg">
                          <img src="images/products/19.png" alt="" />
                        </div>
                        <div
                          className="flex items-center justify-between gap20 flex-grow"
                        >
                          <div className="name">
                            <Link to='' className="body-text">Freshpet Healthy Dog Food and Cat</Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="">
                  <li className="mb-14">
                    <div className="body-title">Order product</div>
                  </li>
                  <li className="mb-14">
                    <div className="divider"></div>
                  </li>
                  <li>
                    <ul>
                      <li className="product-item gap14 mb-10">
                        <div className="image no-bg">
                          <img src="images/products/20.png" alt="" />
                        </div>
                        <div
                          className="flex items-center justify-between gap20 flex-grow"
                        >
                          <div className="name">
                            <Link to='' className="body-text">Sojos Crunchy Natural Grain Free...</Link>
                          </div>
                        </div>
                      </li>
                      <li className="mb-10">
                        <div className="divider"></div>
                      </li>
                      <li className="product-item gap14 mb-10">
                        <div className="image no-bg">
                          <img src="images/products/21.png" alt="" />
                        </div>
                        <div
                          className="flex items-center justify-between gap20 flex-grow"
                        >
                          <div className="name">
                            <Link to='' className="body-text"
                              >Kristin Watson</Link>
                          </div>
                        </div>
                      </li>
                      <li className="mb-10">
                        <div className="divider"></div>
                      </li>
                      <li className="product-item gap14 mb-10">
                        <div className="image no-bg">
                          <img src="images/products/22.png" alt="" />
                        </div>
                        <div
                          className="flex items-center justify-between gap20 flex-grow"
                        >
                          <div className="name">
                            <Link to='' className="body-text"
                              >Mega Pumpkin Bone</Link>
                          </div>
                        </div>
                      </li>
                      <li className="mb-10">
                        <div className="divider"></div>
                      </li>
                      <li className="product-item gap14">
                        <div className="image no-bg">
                          <img src="images/products/23.png" alt="" />
                        </div>
                        <div
                          className="flex items-center justify-between gap20 flex-grow"
                        >
                          <div className="name">
                            <Link to='' className="body-text"
                              >Mega Pumpkin Bone</Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="header-grid">
            
            <LanguageDropdown />

            <div className="popup-wrap message type-header">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="header-item">
                    <span className="text-tiny">1</span>
                    <i className="icon-bell"></i>
                  </span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end has-content"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    <h6>Notifications</h6>
                  </li>

                  <li>
                    <div className="message-item item-4">
                      <div className="image">
                        <i className="icon-noti-4"></i>
                      </div>
                      <div>
                        <div className="body-title-2">
                          Order pending: <span>ID 305830</span>
                        </div>
                        <div className="text-tiny">
                          Ultricies at rhoncus at ullamcorper
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to='' className="tf-button w-full">View all</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="popup-wrap user type-header">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="header-user wg-user">
                    <span className="image">
                      <img src="images/avatar/user-1.png" alt="" />
                    </span>
                    <span className="flex flex-column">
                      <span className="body-title mb-2">Kristin Watson</span>
                      <span className="text-tiny">Admin</span>
                    </span>
                  </span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end has-content"
                  aria-labelledby="dropdownMenuButton3"
                >
                  <li>
                    <Link to="" className="user-item">
                      <div className="icon">
                        <i className="icon-user"></i>
                      </div>
                      <div className="body-title-2">Account</div>
                    </Link>
                  </li>

                  <li>
                    <Link 
                    to='#' 
                    className="user-item"
                    onClick={handleLogout}
                    >
                      <div className="icon">
                        <i className="icon-log-out"></i>
                      </div>
                      <div className="body-title-2">Log out</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopHeader