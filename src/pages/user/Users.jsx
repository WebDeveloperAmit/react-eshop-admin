import { Link } from "react-router"

const Users = () => {
  return (
    <div className="main-content-inner">
        <div className="main-content-wrap">
            <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Users</h3>
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
                <div className="text-tiny">All User</div>
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
                        <th>#</th>
                        <th>User</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th className="text-center">Total Orders</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td className="pname">
                        <div className="image">
                            <img src="" alt="" className="image" />
                        </div>
                        <div className="name">
                            <Link to="#" className="body-title-2">Admin</Link>
                            <div className="text-tiny mt-3">ADM</div>
                        </div>
                        </td>
                        <td>1234567890</td>
                        <td>admin@surfsidemedia.in</td>
                        <td className="text-center"><Link to="#" target="_blank">0</Link></td>
                        <td>
                        <div className="list-icon-function">
                            <Link to="#">
                            <div className="item edit">
                                <i className="icon-edit-3" />
                            </div>
                            </Link>
                        </div>
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

export default Users