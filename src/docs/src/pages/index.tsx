import Link from "@docusaurus/Link"
import Layout from "@theme/Layout"
import React from "react"

const links = [
  { title: "GitHub", link: "https://github.com/cezerin2" },
  { title: "Plusha Theme", link: "https://plusha.demo.chost.ansiglobal.com" },
  { title: "Default Theme", link: "https://demo.chost.ansiglobal.com" },
  { title: "Dashboard", link: "https://demo.chost.ansiglobal.com/admin" },
  { title: "Telegram Chat", link: "https://t.me/cezerin" },
  { title: "Docs", link: "/docs" },
  { title: "FAQ", link: "/docs/help/faq" },
  { title: "HowTos", link: "/docs/help/howtos" },
  { title: "Facebook", link: "https://facebook.com/cezerin" },
  { title: "Twitter", link: "https://twitter.com/cezerin2" },
]

const LinkElement = (): JSX.Element => (
  <div className="grid items-center gap-2 text-center text-lg font-semibold sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10">
    {links.map(({ title, link }) => (
      <Link
        to={link}
        className="rounded-md bg-slate-500 p-2 text-white dark:bg-white dark:text-black"
      >
        {title}
      </Link>
    ))}
  </div>
)

const Home = (): JSX.Element => (
  <Layout
    // title="Cezerin - ReactJS eCommerce platform. React Shopping Cart."
    // description="Cezerin is open-source ecommerce platform. React Shopping Cart. Allows creating a Progressive Web Apps built with React and Node.js. API-first CMS."
    title="Ecommerce platform which is highly customizable."
    description="Ecommerce platform which is highly customizable, strong customer support and cheap for startups and established businesses. Give your details, start your store. It's that easy."
  >
    <div className="mx-10 my-6 grid gap-12 md:mx-44 md:my-24">
      <header className="text-center">
        <h1>Ecommerce Progressive Web Apps</h1>
        <p>
          Cezerin is React and Node.js based eCommerce platform. React Shopping
          Cart. Single-page application. Open-Source.
        </p>
        <LinkElement />
      </header>

      <main className="grid gap-8">
        <div className="grid md:grid-cols-2">
          <img
            src="img/cezerin-mobile-order-summary.png"
            alt="Cezerin Mobile Order Summary"
            title="Cezerin Mobile Order Summary"
            className="justify-self-center"
          />
          <div className="place-self-center">
            <h2>We Are Building A Better Future</h2>
            <p>
              We use latest technologies to build web apps with efficient use of
              the network. Web app loads once on startup and fetches a smaller
              amount of data when you request a new page.
            </p>
            <h2>Progressive Web Apps</h2>
            <p>
              Building a high-quality Progressive Web App has incredible
              benefits, making it easy to delight your users, grow engagement
              and increase conversions.
            </p>
            <p>
              <a href="https://plusha.demo.chost.ansiglobal.com">
                Demo Store - Plusha Theme
              </a>
            </p>
            <p>
              <a href="https://demo.chost.ansiglobal.com">
                Demo Store - Default Theme
              </a>
            </p>
            <p>
              <a href="https://demo.chost.ansiglobal.com/admin">
                Demo Store - Dashboard
              </a>
            </p>
          </div>
        </div>

        <h2>Features</h2>
        <ul className="grid md:grid-cols-2">
          <li>Products (options, variants, attributes)</li>
          <li>Product categories</li>
          <li>Inventory and stock management</li>
          <li>Customers</li>
          <li>Customer groups</li>
          <li>Orders</li>
          <li>Order custom statuses</li>
          <li>Pages</li>
          <li>File manager</li>
          <li>Shipping and payment methods</li>
          <li>Custom shipping fields</li>
          <li>Payment Gateways</li>
          <li>Checkout options</li>
          <li>Access Tokens</li>
          <li>Export theme to zip archive</li>
          <li>Install theme from zip archive</li>
          <li>Theme Settings</li>
          <li>Apps Store</li>
          <li>Server-side rendering (SEO friendly)</li>
          <li>Passwordless</li>
        </ul>

        <h2>Plusha Theme</h2>
        <img
          src="img/cezerin-plusha-theme.png"
          alt="Cezerin Plusha Theme"
          title="Cezerin Plusha Theme"
          className="mx-auto block md:w-2/3 lg:w-1/2"
        />
        <h2>Default Theme</h2>
        <img
          src="img/cezerin-default-theme.png"
          alt="Cezerin Default Theme"
          title="Cezerin Default Theme"
          className="mx-auto block md:w-2/3 lg:w-1/2"
        />
        <h2>Dashboard</h2>
        <img
          src="img/cezerin-dashboard-products.png"
          alt="Cezerin Dashboard"
          title="Cezerin Dashboard"
          className="mx-auto block md:w-2/3 lg:w-1/2"
        />

        <h2>Roadmap</h2>
        <p>
          The future roadmap of Cezerin includes a number of focus areas, some
          of which are detailed below (in no particular order)
        </p>

        <ul className="grid md:grid-cols-2">
          <li>Documentation</li>
          <li>Automated tests</li>
          <li>Central update</li>
          <li>Themes Store</li>
          <li>WebHooks</li>
          <li>Realtime API</li>
          <li>Shipping Integrations</li>
          <li>Customer Account</li>
          <li>Push Notifications</li>
          <li>Braintree Payments</li>
          <li>Stripe Payments</li>
        </ul>

        <h2>Join Us</h2>
        <LinkElement />
      </main>
    </div>
  </Layout>
)

export default Home
