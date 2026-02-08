import { Link } from "react-router"

const Orders = () => {
  return (
    <div className="main-content-inner">
    <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>Orders</h3>
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
            <div className="text-tiny">Orders</div>
            </li>
        </ul>
        </div>
        <div className="wg-box">
        <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">
            <form className="form-search">
                <fieldset className="name">
                <input type="text" placeholder="Search here..." className name="name" tabIndex={2} defaultValue aria-required="true" required />
                </fieldset>
                <div className="button-submit">
                <button className type="submit"><i className="icon-search" /></button>
                </div>
            </form>
            </div>
        </div>
        {/* <div className="wg-table table-all-user"> */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th style={{width: 70}}>OrderNo</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Phone</th>
                        <th className="text-center">Subtotal</th>
                        <th className="text-center">Tax</th>
                        <th className="text-center">Total</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Order Date</th>
                        <th className="text-center">Total Items</th>
                        <th className="text-center">Delivered On</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="text-center">1</td>
                        <td className="text-center">Divyansh Kumar</td>
                        <td className="text-center">1234567891</td>
                        <td className="text-center">$172.00</td>
                        <td className="text-center">$36.12</td>
                        <td className="text-center">$208.12</td>
                        <td className="text-center">ordered</td>
                        <td className="text-center">2024-07-11 00:54:14</td>
                        <td className="text-center">2</td>
                        <td />
                        <td className="text-center">
                        <a href="order-details.html">
                            <div className="list-icon-function view-icon">
                            <div className="item eye">
                                <i className="icon-eye" />
                            </div>
                            </div>
                        </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        {/* </div> */}
        <div className="divider" />
        <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination">
        </div>
        </div>
    </div>
    </div>

  )
}

export default Orders