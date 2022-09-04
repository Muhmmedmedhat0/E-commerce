import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useState, useEffect } from 'react';

export default function FeaturedInfo() {
const user = JSON.parse(sessionStorage?.getItem('persist:user'))?.userInfo;
const currentUser = user && JSON.parse(user);
  const TOKEN = currentUser?.token;
  
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  
  useEffect(() => {
    const getIncome = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/orders/income',
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );
        const data = await response.json();
        setIncome(data);
        setPerc(
          (response.data[1]?.total * 100) / response.data[0]?.total - 100
        );
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, [TOKEN]);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total || 0} </span>
          <span className="featuredMoneyRate">
            % {Math.floor(perc)}
            {perc <= 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
