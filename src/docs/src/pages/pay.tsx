import Layout from "@theme/Layout"
import React, { createElement, useEffect } from "react"

const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://js.stripe.com/v3/pricing-table.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return createElement("stripe-pricing-table", {
    "pricing-table-id": "rctbl_1NDBSbDshTneKUZ5YECOSS5p",
    "publishable-key":
      "pk_live_51NBBLLDshTneKUZ5goj7zlTz1z0VPrJXXYWdGzdmhT1pYyLUtYNN6SgeA9HsDvEFdELeXMmNaPanIU5Yk0NAqYUD00BBhPylNc",
  })
}

const DashboardPage = () => (
  <div className="text-center">
    <h2>Payment Methods</h2>
    <br />
    <h3>Paypal</h3>
    <br />
    <a href="https://www.paypal.com/us/webapps/mpp/paypal-fees">Paypal fees</a>
    <a href="https://www.paypal.me/himadu1">Paypal</a>
    <br />
    <h3>Stripe</h3>
    <br />
    <a href="https://stripe.com/pricing/local-payment-methods">Stripe fees</a>
    <StripePricingTable />
    <a href="https://billing.stripe.com/p/login/6oEaI59t2bsx5igfYY">
      Manage your stripe subscription
    </a>
    <br />
    <h3>Bank transfer</h3>
    <br />
    Name: W .H.C.K. Sirimanna
    <br />
    Account number: 0330 12041200 120
    <br />
    Bank and Branch: SEYLAN Bank - Kottawa Branch
  </div>
)

const Purchase = (): JSX.Element => (
  <Layout title="Pay" description="Start your new store.">
    <header>
      <p>
        We have a base rate of 2$/month (Since we are startup price is subject
        to change but we will promise to keep it competitive and will notify on
        change. Also if you want to leave our service we will help you to move
        to a different provider with no additional cost!). For your convienience
        we have given you many payment options however since each service have
        different rates, fees, charges etc. We&#39;ll send an invoice to pay the
        remaing amount.
      </p>
    </header>
    <main>
      <DashboardPage />
    </main>
  </Layout>
)

export default Purchase
