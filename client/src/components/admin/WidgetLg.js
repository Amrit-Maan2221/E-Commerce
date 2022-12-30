import './styles/WidgetLg.scss';
import { axoisInstance } from '../../util/ApiBaseUrlInstance';
import { useEffect, useState } from 'react';
import FormatPrice from '../../util/FormatPrice';

function WidgetLg() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axoisInstance.get("orders?limit=5");
                setOrders(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getOrders();
    }, []);
    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (
        <div className="widgetLg admin">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <thead>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr className="widgetLgTr" key={order._id}>
                            <td className="widgetLgUser">
                                <img
                                    src={
                                        order.user_info[0].img ||
                                        "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                                    }
                                    alt=""
                                    className="widgetLgImg"
                                />
                                <span className="widgetLgName">{order.user_info[0].username}</span>
                            </td>
                            <td className="widgetLgDate">{new Date(Date.parse(order.createdAt)).toDateString()}</td>
                            <td className="widgetLgAmount"><FormatPrice price={order.amount} /></td>
                            <td className="widgetLgStatus">
                                <Button type={order.orderStatus} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WidgetLg