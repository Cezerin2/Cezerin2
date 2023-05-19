import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { themeSettings } from "../lib/settings"
import MetaTags from "../components/metaTags"
import PageList from "../components/pageList"
import PageBreadcrumbs from "../components/breadcrumbs"

const PageContainer = props => {
  const {
    state: { pageDetails },
  } = props
  const pageListTag = themeSettings.page_list_tag
  const pageListTagDefined = pageListTag && pageListTag.length > 0
  const pageListPath = pageListTagDefined ? `/${pageListTag}` : null
  const showPageList = pageListTagDefined && pageDetails.path === pageListPath

  return (
    <Fragment>
      <MetaTags
        title={pageDetails.meta_title}
        description={pageDetails.meta_description}
        canonicalUrl={pageDetails.url}
        ogType="article"
        ogTitle={pageDetails.meta_title}
        ogDescription={pageDetails.meta_description}
      />

      <section className="main__header section-container">
        <PageBreadcrumbs
          page={pageDetails.meta_title}
          path={pageDetails.path}
        />
        <h1 className="main__title">{pageDetails.meta_title}</h1>
      </section>

      <section className="section-container page">
        <div
          className="page__content"
          dangerouslySetInnerHTML={{
            __html: pageDetails.content,
          }}
        />
        {showPageList && <PageList tags={pageListTag} sort="-date_created" />}
      </section>
    </Fragment>
  )
}

PageContainer.propTypes = {
  state: PropTypes.shape({
    pageDetails: PropTypes.shape({}),
  }).isRequired,
}

export default PageContainer
