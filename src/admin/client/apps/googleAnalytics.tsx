import api from "lib/api"
import messages from "lib/text"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import React, { FC, useEffect, useState } from "react"

export const Description = {
  key: "google-analytics",
  name: "Google Analytics",
  coverUrl: "/admin-assets/images/apps/google_analytics.png",
  description: `Google Analytics gives you the digital analytics tools you need to analyze data from all touchpoints in one place, for a deeper understanding of the customer experience.
  <p>This App logs page views and Enhanced ecommerce events:</p>
  <ol>
    <li>Page view</li>
    <li>Product view</li>
    <li>Search</li>
    <li>Add to cart</li>
    <li>Remove from cart</li>
    <li>Begin checkout</li>
    <li>Set shipping method</li>
    <li>Set payment method</li>
    <li>Purchase</li>
  </ol>
  <p>This App will add gtag.js to your site. The Global Site Tag (gtag.js) provides a framework for streamlined web page tagging – giving you better control while making implementation easier. Using gtag.js lets you benefit from the latest tracking features and integrations as they become available.</p>`,
}

const gtagCode = `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>`

export const App: FC = () => {
  const [trackingID, setTrackingID] = useState("")

  const fetchSettings = () =>
    api.apps.settings
      .retrieve("google-analytics")
      .then(({ json }) => {
        const appSettings = json
        setTrackingID(appSettings?.GA_TRACKING_ID)
      })
      .catch(console.error)

  const updateSettings = () => {
    const gtag =
      trackingID?.length > 0
        ? gtagCode.replace(/GA_TRACKING_ID/g, trackingID)
        : ""

    api.apps.settings.update("google-analytics", {
      GA_TRACKING_ID: trackingID,
    })
    api.theme.placeholders.update("google-analytics", {
      place: "head_start",
      value: gtag,
    })
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <div>
      <div>
        Enter your Google Analytics Tracking ID to track page views and other
        events.
      </div>

      <TextField
        type="text"
        value={trackingID}
        onChange={({ target }) => setTrackingID(target.value)}
        floatingLabelText="Tracking ID"
        hintText="UA-XXXXXXXX-X"
      />

      <div style={{ textAlign: "right" }}>
        <RaisedButton
          label={messages.save}
          primary
          disabled={false}
          onClick={updateSettings}
        />
      </div>
    </div>
  )
}
