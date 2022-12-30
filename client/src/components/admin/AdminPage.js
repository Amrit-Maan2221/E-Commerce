import { useEffect, useMemo, useState } from "react";
import { axoisInstance } from "../../util/ApiBaseUrlInstance";
import Chart from "./Chart";
import FeaturedInfo from "./FeaturedInfo";
import "./styles/AdminPage.scss";
import WidgetLg from "./WidgetLg";
import WidgetSm from "./WidgetSm";

function AdminPage() {
  const [userStats, setUserStats] = useState([]);

  
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axoisInstance.get("/users/stats");
        console.log(res.data);
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err){
        console.log(err);
      }
    };
    getStats();

    console.log(userStats)
  }, [MONTHS]);

  return (
    <div className="home admin">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default AdminPage