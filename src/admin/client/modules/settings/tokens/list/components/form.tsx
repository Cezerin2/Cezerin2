import { KeyboardArrowRight } from "@mui/icons-material"
import messages from "lib/text"
import Divider from "material-ui/Divider"
import { List, ListItem } from "material-ui/List"
import Paper from "material-ui/Paper"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const TokenItem = ({ token }) => (
  <>
    <Divider />
    <Link
      to={`/admin/settings/tokens/${token.id}`}
      style={{ textDecoration: "none" }}
    >
      <ListItem
        rightIcon={<KeyboardArrowRight />}
        primaryText={
          <div className="row">
            <div className="col-xs-6">{token.name}</div>
            <div className="col-xs-6" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
              {token.email}
            </div>
          </div>
        }
      />
    </Link>
  </>
)

interface Props {
  tokens
  onLoad: () => void
}

const TokensList: FC<Props> = props => {
  const { tokens, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const listItems = tokens.map((token, index) => (
    <TokenItem key={index} token={token} />
  ))

  return (
    <div>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.settings_tokenHelp}
      </div>
      <Paper className="paper-box" zDepth={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>{listItems}</List>
        </div>
      </Paper>
    </div>
  )
}

export default TokensList
