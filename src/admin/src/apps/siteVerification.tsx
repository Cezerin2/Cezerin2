import api from "lib/api"
import messages from "lib/text"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import React, { FC, useEffect, useState } from "react"

export const Description = {
  key: "site-verification",
  name: "Site Verification",
  coverUrl: "/admin-assets/images/apps/site_verification.png",
  description: `Note that verifying your site with these services is not necessary in order for your site to be indexed by search engines. To use these advanced search engine tools and verify your site with a service, paste the HTML Tag code below.
  <p>Supported verification services:</p>
  <ol>
    <li><a target="_blank" href="https://www.google.com/webmasters/tools/" rel="external noopener noreferrer">Google Search Console</a></li>
    <li><a target="_blank" href="https://www.bing.com/webmaster/" rel="external noopener noreferrer">Bing Webmaster Center</a></li>
    <li><a target="_blank" href="https://pinterest.com/website/verify/" rel="external noopener noreferrer">Pinterest Site Verification</a></li>
    <li><a target="_blank" href="https://webmaster.yandex.com/sites/" rel="external noopener noreferrer">Yandex.Webmaster</a></li>
  </ol>`,
}

const googleExample = '<meta name="google-site-verification" content="1234" />'
const bingExample = '<meta name="msvalidate.01" content="1234" />'
const pinterestExample = '<meta name="p:domain_verify" content="1234" />'
const yandexExample = '<meta name="yandex-verification" content="1234" />'

export const App: FC = () => {
  const [google, setGoogle] = useState("")
  const [bing, setBing] = useState("")
  const [pinterest, setPinterest] = useState("")
  const [yandex, setYandex] = useState("")

  const fetchSettings = () =>
    api.apps.settings
      .retrieve("site-verification")
      .then(({ json }) => {
        const appSettings = json
        setGoogle(appSettings?.google)
        setBing(appSettings?.bing)
        setPinterest(appSettings?.pinterest)
        setYandex(appSettings?.yandex)
      })
      .catch(console.error)

  const updateSettings = () => {
    const metaTags = [google, bing, pinterest, yandex]
      .map(tag => (tag && tag.length > 0 ? tag : null))
      .filter(tag => tag !== null)
      .join("\n")

    api.apps.settings.update("site-verification", {
      google,
      bing,
      pinterest,
      yandex,
    })

    api.theme.placeholders.update("site-verification", {
      place: "head_start",
      value: metaTags,
    })
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <>
      <TextField
        type="text"
        value={google}
        onChange={({ target }) => setGoogle(target.value)}
        floatingLabelText="Google"
        fullWidth
        hintText={googleExample}
      />

      <TextField
        type="text"
        value={bing}
        onChange={({ target }) => setBing(target.value)}
        floatingLabelText="Bing"
        fullWidth
        hintText={bingExample}
      />

      <TextField
        type="text"
        value={pinterest}
        onChange={({ target }) => setPinterest(target.value)}
        floatingLabelText="Pinterest"
        fullWidth
        hintText={pinterestExample}
      />

      <TextField
        type="text"
        value={yandex}
        onChange={({ target }) => setYandex(target.value)}
        floatingLabelText="Yandex"
        fullWidth
        hintText={yandexExample}
      />

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <RaisedButton
          label={messages.save}
          primary
          disabled={false}
          onClick={updateSettings}
        />
      </div>
    </>
  )
}
