import { getAnalytics } from "@/app/actions/analytics/data"
import Webtrafic from "./Webtrafic";
import AccountLevel from "./AccountLevel";
import ActiveUsers from "./ActiveUsers";
import PolarChart from "./PolarChart";
import Share from "../share/Share";

const Analytics = async () => {
    const { data } = await getAnalytics();

    return (
        <section className="analytic-section">
            <div className="report-card-wrapper">
                <div className="report-card-parent">
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-primary">
                                <i className="fa fa-toggle-on"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>ACTIVE USER</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>{data?.activeUsers ?? "Loading"}</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-bright">
                                <i className="fa fa-chart-line"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>ADMINISTRATOR</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>{data?.admin ?? "Loading"}</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-green">
                                <i className="fa fa-users"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>CUSTOMER</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>{data?.userAccount ?? "Loading"}</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-purple">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>PRACTICE ACCOUNT</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>{data?.practiceAccount ?? "Loading"}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="report-card-container">
                <div className="report-card-parent-container">
                    <div className="report-card-childs-container">
                        <div className="report-card-childs-container-sub">
                            <p>Availabe Products</p>
                            <h3>{data?.availableProducts ?? "Loading"}</h3>
                        </div>
                        <div className="report-card-childs-container-sub">
                            <i className="fa fa-box"></i>
                        </div>
                    </div>
                </div>
                <div className="report-card-parent-container">
                    <div className="report-card-childs-container">
                        <div className="report-card-childs-container-sub">
                            <p>Order Received </p>
                            <h3>{data?.orderReceived ?? "Loading"}</h3>
                        </div>
                        <div className="report-card-childs-container-sub">
                            <i className="fa fa-exchange"></i>
                        </div>
                    </div>
                </div>
                <div className="report-card-parent-container">
                    <div className="report-card-childs-container">
                        <div className="report-card-childs-container-sub">
                            <p>Membership Level</p>
                            <h3>{data?.membershipLevel ?? "Loading"}</h3>
                        </div>
                        <div className="report-card-childs-container-sub">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                </div>
                <div className="report-card-parent-container">
                    <div className="report-card-childs-container">
                        <div className="report-card-childs-container-sub">
                            <p>No. Of Transactions</p>
                            <h3>{data?.noOfTransaction ?? "Loading"}</h3>
                        </div>
                        <div className="report-card-childs-container-sub">
                            <i className="fa fa-dollar"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="analytics-wrapper">
                <div className="analytics-wrapper-parents">
                    <div className="analytics-wrapper-childs">
                        <div className="d-card">
                            <div className="d-card-header">
                                <p>ANALYTICS</p>
                                <h3>Account Level</h3>
                            </div>
                            <div className="d-card-body d-card-body-bg-color card-body-padding">
                                <AccountLevel />
                            </div>
                        </div>
                    </div>
                    <div className="analytics-wrapper-childs">
                        <div className="d-card">
                            <div className="d-card-header">
                                <p>ANALYTICS</p>
                                <h3>Platform Performance</h3>
                            </div>
                            <div className="d-card-body d-card-body-bg-color card-body-padding">
                                <Webtrafic />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="analytics-wrapper mt2">
                <div className="analytics-wrapper-parents">
                    <div className="analytics-wrapper-childs">
                        <div className="d-card">
                            <div className="d-card-header">
                                <p>ANALYTICS</p>
                                <h3>Active Users</h3>
                            </div>
                            <div className="d-card-body d-card-body-bg-color card-body-padding">
                                <ActiveUsers />
                            </div>
                        </div>
                    </div>
                    <div className="analytics-wrapper-childs">
                        <div className="d-card">
                            <div className="d-card-header">
                                <p>ANALYTICS</p>
                                <h3>Platform Range</h3>
                            </div>
                            <div className="d-card-body d-card-body-bg-color card-body-padding">
                                <PolarChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="webtrafic-wrapper d-none">
                <div className="webtrafic-parents">
                    <div className="webtrafic-childs">
                        <div className="show-recent-users">
                            <div className="d-card">
                                <div className="d-card-header">
                                    <p>PROGRESS</p>
                                    <h3>Commissions</h3>
                                </div>
                                <div className="d-card-body">
                                    <ul>
                                        <div className="commission-parent-info-wrapper">
                                            <div className="commission-childs-info-wrapper">
                                                <p>Bronze</p>
                                            </div>
                                            <div className="commission-childs-info-wrapper">
                                                <div className="commission-progressbar">
                                                    <div className="commission-progress"></div>
                                                </div>
                                                <p>Level Comm - 0.55 | Ticket Comm - 0.66</p>
                                            </div>
                                        </div>
                                    </ul>
                                    <ul>
                                        <div className="commission-parent-info-wrapper">
                                            <div className="commission-childs-info-wrapper">
                                                <p>Silver</p>
                                            </div>
                                            <div className="commission-childs-info-wrapper">
                                                <div className="commission-progressbar">
                                                    <div className="commission-progress"></div>
                                                </div>
                                                <p>Level Comm - 0.55 | Ticket Comm - 0.66</p>
                                            </div>
                                        </div>
                                    </ul>
                                    <ul>
                                        <div className="commission-parent-info-wrapper">
                                            <div className="commission-childs-info-wrapper">
                                                <p>Gold</p>
                                            </div>
                                            <div className="commission-childs-info-wrapper">
                                                <div className="commission-progressbar">
                                                    <div className="commission-progress"></div>
                                                </div>
                                                <p>Level Comm - 0.55 | Ticket Comm - 0.66</p>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="webtrafic-childs">
                        {/* <Trafic /> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Analytics