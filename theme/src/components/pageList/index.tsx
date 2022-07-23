import React, { FC, useEffect, useState } from "react"
import api from "../../lib/api"
import PageList from "./list"

interface Props {
  tags: any
  sort: any
}

const CustomPageList: FC<Props> = props => {
  const [pages, setPages] = useState([])

  useEffect(() => {
    fetchData(props)
  }, [props])

  const fetchData = ({ tags, sort }) => {
    const filter = {
      tags: tags,
      sort: sort,
    }

    api.ajax.pages.list(filter).then(({ status, json }) => {
      setPages(json)
    })
  }

  return <PageList pages={pages} />
}

export default CustomPageList
