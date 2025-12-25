import { Outlet } from 'react-router-dom';

import Footer from '../../components/common/Footer';
import TopHeader from '../common/TopHeader';
import SidebarMenu from '../sidebar/SidebarMenu';

const AdminLayout = () => {
  return (
    <>
      <div id="wrapper">
        <div id="page" className="">
          <div className="layout-wrap">
          {/* <Loader /> */}
          <SidebarMenu />
            <div className="section-content-right">
            <TopHeader />
              <div className="main-content">
                <Outlet />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout