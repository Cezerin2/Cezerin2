import React from "react"
import MetaTags from "../components/metaTags"
import { text } from "../lib/settings"

const NotFoundContainer = () => (
  <>
    <MetaTags title={text.title404} />
    <section className="section">
      <div className="container">
        <div className="content">
          <h1>{text.title404}</h1>
          {text.text404}
        </div>
      </div>
    </section>
  </>
)

export default NotFoundContainer
