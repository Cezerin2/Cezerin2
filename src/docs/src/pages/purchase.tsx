import Layout from "@theme/Layout"
import React from "react"

const DashboardPage = () => (
  <>
    Payment options
    <br />
    Paypal
    <br />
    <a href="https://www.paypal.me/himadu1">Paypal</a>
    <br />
    Stripe
    <br />
    Bank transfer
    <br />
    Name: W .H.C.K. Sirimanna
    <br />
    Account number: 0330 12041200 120
    <br />
    Bank and Branch: SEYLAN Bank - Kottawa Branch
  </>
)

const Purchase = (): JSX.Element => (
  <Layout title="Purchase" description="Purchase your new store.">
    <main>
      <DashboardPage />
    </main>
  </Layout>
)

export default Purchase
