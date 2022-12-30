import { useEffect, useState } from "react";
import { axoisInstance } from "../../util/ApiBaseUrlInstance";
import "./styles/FeaturedInfo.scss";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import FormatPrice from "../../util/FormatPrice";

function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  let previousMonthIncome;

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axoisInstance.get("/orders/income");
        console.log(res.data);
        
        if((res.data[1]?._id > res.data[0]?._id) && res.data[0]?._id !== 1){
          setIncome(res.data[1].total);
          setPerc((res.data[1]?.total * 100) / res.data[0]?.total - 100);
        } else{
          setIncome(res.data[0].total);
          setPerc((res.data[0]?.total * 100) / res.data[1]?.total - 100);
        }
      } catch (err) {
        console.log(err)
      }
    };
    getIncome();
  }, []);

  return (
    <div className="featured admin">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"><FormatPrice price={income} /></span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      {/* <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}
      {/* <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}
    </div>
  )
}

export default FeaturedInfo