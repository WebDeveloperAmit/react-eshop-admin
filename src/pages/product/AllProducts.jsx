import { Link } from "react-router"

const AllProducts = () => {
  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>All Products List</h3>
          <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
            <li>
              <Link to="/">
                <div className="text-tiny">Dashboard</div>
              </Link>
            </li>
            <li>
              <i className="icon-chevron-right" />
            </li>
            <li>
              <div className="text-tiny">All Products</div>
            </li>
          </ul>
        </div>
        <div className="wg-box">
          <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">
              <form className="form-search">
                <fieldset className="name">
                  <input 
                  type="text" 
                  placeholder="Search here..." 
                  className="" 
                  name="search" 
                  />
                </fieldset>
                <div className="button-submit">
                  <button className type="submit"><i className="icon-search" /></button>
                </div>
              </form>
            </div>
            <Link 
            className="tf-button style-1 w208" 
            to="/product/create"><i className="icon-plus" />Add new product</Link>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>SL. NO</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Regular Price</th>
                  <th>Sale Price</th>
                  <th>SKU</th>
                  <th>Is Featured</th>
                  <th>Stock</th>
                  <th>Qty</th>
                  <th>Thumbnail Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>6</td>
                  <td className="pname">
                    <div className="image">
                      <img src="" alt="" className="image" />
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="list-icon-function">

                      <Link to="#" target="_blank">
                        <div className="item eye">
                          <i className="icon-eye" />
                        </div>
                      </Link>

                      <Link to="#">
                        <div className="item edit">
                          <i className="icon-edit-3" />
                        </div>
                      </Link>

                      <form action="#" method="POST">
                        <div className="item text-danger delete">
                          <i className="icon-trash-2" />
                        </div>
                      </form>
                      
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="divider" />
          <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination">
          </div>
        </div>
      </div>
    </div>

  )
}

export default AllProducts