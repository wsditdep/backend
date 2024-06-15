import DashboardLayout from "../../page";
import CreateMembership from '@/components/membership/CreateMembership';
import { fetchMembership } from '@/app/actions/membership/data';
import CommissionAction from "@/components/formAction/CommissionAction";
import DefaultMembership from "@/components/membership/DefaultMembership";

export const dynamic = "force-dynamic";

const page = async () => {
    
    const membership = await fetchMembership();

    return (
        <DashboardLayout >
            <div className="content-information-wrapper">
                <div className="inner-information-wrapper">
                    <CreateMembership />
                    <div className="global-table responsive-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Default</th>
                                    <th>Commission Rate</th>
                                    <th>Minimum balance</th>
                                    <th>Number of order received</th>
                                    <th>Number of withdrawals</th>
                                    <th>Minimum amount to withdraw</th>
                                    <th>Maximum withdrawal amount</th>
                                    <th></th>
                                    <th>Operation</th>
                                </tr>
                                {
                                    membership?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.membership_name}</td>
                                            <td>
                                                <DefaultMembership data={JSON.parse(JSON.stringify(data))} />
                                            </td>
                                            <td>{data.commission_rate}</td>
                                            <td>{data.account_balance_limit}</td>
                                            <td>{data.order_quantity}</td>
                                            <td>{data.number_of_withdrawal}</td>
                                            <td>{data.min_withdrawal_amount}</td>
                                            <td>{data.max_withdrawal_amount}</td>
                                            <CommissionAction
                                                data={JSON.parse(JSON.stringify(data))}
                                            />
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default page