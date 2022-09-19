import { KeyboardArrowRight, LockOutlined } from "@mui/icons-material"
import Divider from "material-ui/Divider"
import { List, ListItem } from "material-ui/List"
import Paper from "material-ui/Paper"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const PageItem = ({ page }) => {
  const tags = page.tags && page.tags.length > 0 ? page.tags.join(", ") : ""

  return (
    <div>
      <Divider />
      <Link to={`/admin/pages/${page.id}`} style={{ textDecoration: "none" }}>
        <ListItem
          rightIcon={<KeyboardArrowRight />}
          leftIcon={page.is_system ? <LockOutlined /> : null}
          style={!page.enabled ? { color: "rgba(0, 0, 0, 0.3)" } : {}}
          primaryText={
            <div className="row">
              <div className="col-xs-8">{page.meta_title}</div>
              <div className="col-xs-4" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                {tags}
              </div>
            </div>
          }
        />
      </Link>
    </div>
  )
}

interface Props {
  pages
  onLoad: () => void
}

const PagesList: FC<Props> = props => {
  const { pages, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const listItems = pages.map((page, index) => (
    <PageItem key={index} page={page} />
  ))

  return (
    <Paper className="paper-box" zDepth={1}>
      <div style={{ width: "100%" }}>
        <List style={{ padding: 0 }}>{listItems}</List>
      </div>
    </Paper>
  )
}

export default PagesList
