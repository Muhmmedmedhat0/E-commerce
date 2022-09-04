import { useEffect, useState } from 'react';
// import TimeAgo from 'timeago-react';
import './widgetLg.css';

export default function WidgetLg() {
  const user = JSON.parse(sessionStorage?.getItem('persist:user'))?.userInfo;
  const currentUser = user && JSON.parse(user);
  const TOKEN = currentUser?.token;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        if (error) {
          // setErrorFound(error);
          console.log(error);
        }
      }
    };
    getOrders();
  }, [TOKEN]);
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead className="widgetLgTr">
          <tr>
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.slice(0, 6)?.map((order) => {
            return (
              <tr className="widgetLgTr" key={order._id}>
                <td className="widgetLgUser"><span className="widgetLgName">{order.userId}</span></td>
                <td className="widgetLgDate">{/* <TimeAgo datetime={`${order.createdAt}`} /> */}</td>
                <td className="widgetLgAmount">${order.amount}</td>
                <td className="widgetLgStatus"><Button type={order.status} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
