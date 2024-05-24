import { Button, MenuItem } from "@mui/material"
import { forOwn } from "lodash"
import { Select, Switches, TextField } from "mui-rff"
import React from "react"
import { Form } from "react-final-form"

export const SettingsForm = () => (
  <Form
    onSubmit={values => {
      forOwn(values, (value, key) => localStorage.setItem(key, value))
      window.location.reload()
    }}
    initialValues={{
      language: "en",
      apiBaseUrl: "http://localhost:3001/api/v1",
      apiWebSocketUrl: "ws://localhost:3001",
      developerMode: true,
    }}
  >
    {({ handleSubmit, form: { reset }, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        <Select
          name="language"
          label="Language"
          formControlProps={{ margin: "normal" }}
        >
          <MenuItem value="de">de</MenuItem>
          <MenuItem value="en_US">en_US</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">fr</MenuItem>
          <MenuItem value="it">it</MenuItem>
          <MenuItem value="pt_BR">pt_BR</MenuItem>
          <MenuItem value="ru">ru</MenuItem>
          <MenuItem value="si">si</MenuItem>
          <MenuItem value="ta">ta</MenuItem>
          <MenuItem value="uk">uk</MenuItem>
          <MenuItem value="zh_CN">zh_CN</MenuItem>
        </Select>
        <TextField
          name="apiBaseUrl"
          label="API Base URL"
          placeholder="http://yourDomain/api/v1"
          required
        />
        <TextField
          name="apiWebSocketUrl"
          label="API WebSocket URL"
          placeholder="ws://yourDomain"
          required
        />
        <Switches
          name="developerMode"
          required
          data={{ label: "Developer Mode", value: null }}
        />
        <div>
          <Button type="submit" disabled={submitting}>
            Connect
          </Button>
          <Button
            type="button"
            onClick={reset}
            disabled={submitting || pristine}
          >
            Reset
          </Button>
        </div>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </form>
    )}
  </Form>
)
