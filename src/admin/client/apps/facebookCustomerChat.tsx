import api from "lib/api"
import messages from "lib/text"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import React, { FC, useEffect, useState } from "react"

export const Description = {
  key: "facebook-customer-chat",
  name: "Facebook Customer Chat",
  coverUrl: "/admin-assets/images/apps/messenger.png",
  description: `<p>The Messenger Platform's customer chat plugin allows you to integrate your Messenger experience directly into your website. This allows your customers to interact with your business anytime with the same personalized, rich-media experience they get in Messenger.</p>
  <p><img src='/admin-assets/images/apps/facebook-customer-chat-plugin.png' /></p>
  <p>The customer chat plugin automatically loads recent chat history between the person and your business, meaning recent interactions with your business on messenger.com, in the Messenger app, or in the customer chat plugin on your website will be visible. This helps create a single experience for your customers, and enables you to continue the conversation even after they have left your webpage. No need to capture their information to follow up, just use the same conversation in Messenger.</p>
  <p>To access your Facebook's Page ID:</p>
  <ol>
    <li>Open your Facebook page.</li>
    <li>Click the About tab.</li>
    <li>Scroll down to the bottom of the Page Info section.</li>
    <li>Next to Facebook Page ID, you can find your page ID.</li>
  </ol>`,
}

const chatCode = `<div class="fb-customerchat" page_id="PAGE_ID" minimized="IS_MINIMIZED"></div>`

export const App: FC = () => {
  const [pageID, setPageID] = useState("")
  const [minimized, setMinimized] = useState("false")

  const fetchSettings = () =>
    api.apps.settings
      .retrieve("facebook-customer-chat")
      .then(({ json }) => {
        const appSettings = json
        setPageID(appSettings?.pageId)
        setMinimized(appSettings?.minimized)
      })
      .catch(console.error)

  const updateSettings = () => {
    const htmlCode =
      pageID?.length > 0
        ? chatCode
            .replace(/PAGE_ID/g, pageID)
            .replace(/IS_MINIMIZED/g, minimized)
        : ""

    api.apps.settings.update("facebook-customer-chat", {
      pageID,
      minimized,
    })
    api.theme.placeholders.update("facebook-customer-chat", {
      place: "body_end",
      value: htmlCode,
    })
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <>
      <TextField
        type="text"
        fullWidth
        value={pageID}
        onChange={({ target }) => setPageID(target.value)}
        floatingLabelText="Page ID"
      />

      <TextField
        type="text"
        fullWidth
        value={minimized}
        onChange={({ target }) => setMinimized(target.value)}
        floatingLabelText="minimized"
        hintText="false"
      />

      <div style={{ textAlign: "right" }}>
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
