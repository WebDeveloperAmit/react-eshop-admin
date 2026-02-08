import { useTranslation } from "react-i18next";

const Dashboard = () => {

  const { t } = useTranslation();

  return (
    <>
        <div className="main-content-inner">
          <div className="main-content-wrap">
            <div className="mb-30">
              <div className="flex gap20 flex-wrap-mobile">
                <div className="w-half">
                  <div className="wg-chart-default mb-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap14">
                        <div className="image ic-bg">
                          <i className="icon-shopping-bag"></i>
                        </div>
                        <div>
                          <div className="body-text mb-2">{t("total_orders")}</div>
                          <h4>3</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wg-chart-default mb-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap14">
                        <div className="image ic-bg">
                          <i className="icon-shopping-bag"></i>
                        </div>
                        <div>
                          <div className="body-text mb-2">{t("total_brands")}</div>
                          <h4>481.34</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wg-chart-default mb-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap14">
                        <div className="image ic-bg">
                          <i className="icon-shopping-bag"></i>
                        </div>
                        <div>
                          <div className="body-text mb-2">{t("total_categories")}</div>
                          <h4>3</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wg-chart-default">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap14">
                        <div className="image ic-bg">
                          {/* <i className="icon-dollar-sign"></i> */}
                          <i className="icon-shopping-bag"></i>
                        </div>
                        <div>
                          <div className="body-text mb-2">
                            {t("total_pending_orders")}
                          </div>
                          <h4>481.34</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-half">
                  <div className="wg-chart-default mb-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap14">
                        <div className="image ic-bg">
                          <i className="icon-shopping-bag"></i>
                        </div>
                        <div>
                          <div className="body-text mb-2">{t("total_products")}</div>
                          <h4>0</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wg-chart-default mb-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap14">
                        <div className="image ic-bg">
                          <i className="icon-shopping-bag"></i>
                        </div>
                        <div>
                          <div className="body-text mb-2">
                            {t("total_slider_banners")}
                          </div>
                          <h4>0.00</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wg-chart-default mb-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap14">
                        <div className="image ic-bg">
                          <i className="icon-shopping-bag"></i>
                        </div>
                        <div>
                          <div className="body-text mb-2">
                            {t("total_customers")}
                          </div>
                          <h4>0</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wg-chart-default">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap14">
                        <div className="image ic-bg">
                          {/* <i className="icon-dollar-sign"></i> */}
                          <i className="icon-shopping-bag"></i>
                        </div>
                        <div>
                          <div className="body-text mb-2">
                            {t("total_canceled_orders")}
                          </div>
                          <h4>0.00</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="wg-box">
                <div className="flex items-center justify-between">
                  <h5>Earnings revenue</h5>
                  <div className="dropdown default">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="icon-more"
                        ><i className="icon-more-horizontal"></i
                      ></span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap40">
                  <div>
                    <div className="mb-2">
                      <div className="block-legend">
                        <div className="dot t1"></div>
                        <div className="text-tiny">Revenue</div>
                      </div>
                    </div>
                    <div className="flex items-center gap10">
                      <h4>$37,802</h4>
                      <div className="box-icon-trending up">
                        <i className="icon-trending-up"></i>
                        <div className="body-title number">0.56%</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <div className="block-legend">
                        <div className="dot t2"></div>
                        <div className="text-tiny">Order</div>
                      </div>
                    </div>
                    <div className="flex items-center gap10">
                      <h4>$28,305</h4>
                      <div className="box-icon-trending up">
                        <i className="icon-trending-up"></i>
                        <div className="body-title number">0.56%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="line-chart-8"></div>
              </div> */}


            </div>

            {/* <div className="tf-section mb-30">
              <div className="wg-box">
                <div className="flex items-center justify-between">
                  <h5>Recent orders</h5>
                  <div className="dropdown default">
                    <Link className="btn btn-secondary dropdown-toggle" to="/brand/create">
                      <span className="view-all">View all</span>
                    </Link>
                  </div>
                </div>
                <div className="wg-table table-all-user">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "80px" }}>OrderNo</th>
                          <th>Name</th>
                          <th className="text-center">Phone</th>
                          <th className="text-center">Subtotal</th>
                          <th className="text-center">Tax</th>
                          <th className="text-center">Total</th>

                          <th className="text-center">Status</th>
                          <th className="text-center">Order Date</th>
                          <th className="text-center">Total Items</th>
                          <th className="text-center">Delivered On</th>
                          <th></th>
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
                          <td></td>
                          <td className="text-center">
                            <Link to="">
                              <div className="list-icon-function view-icon">
                                <div className="item eye">
                                  <i className="icon-eye"></i>
                                </div>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}

          </div>

          {/* <LineChart /> */}

        </div>
    </>
  )
}

export default Dashboard