import api from "lib/api"
import messages from "lib/text"
import moment from "moment"
import React, { FC, useEffect, useState } from "react"
import BarChart from "./barChart"
import * as utils from "./utils"

const OrdersBar: FC = () => {
  const [ordersData, setOrdersData] = useState(null)
  const [salesData, setSalesData] = useState(null)

  const fetchData = () => {
    const filter = {
      draft: false,
      cancelled: false,
      date_placed_min: moment()
        .subtract(1, "months")
        .hour(0)
        .minute(0)
        .second(0)
        .toISOString(),
    }

    api.orders
      .list(filter)
      .then(({ status, json }) => {
        const reportData = utils.getReportDataFromOrders(json)
        const getOrdersData = utils.getOrdersDataFromReportData(reportData)
        const getSalesData = utils.getSalesDataFromReportData(reportData)
        setOrdersData(getOrdersData)
        setSalesData(getSalesData)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <BarChart
        data={ordersData}
        legendDisplay
        title={messages.drawer_orders}
      />
      <BarChart
        data={salesData}
        legendDisplay={false}
        title={messages.salesReport}
      />
    </div>
  )
}

export default OrdersBar
