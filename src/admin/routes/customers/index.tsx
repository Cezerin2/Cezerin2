import Groups from "modules/customerGroups/list"
import CustomersList from "modules/customers/list"
import React from "react"

export default () => (
  <div className="row row--no-gutter col-full-height">
    <div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
      <Groups showAll showRoot={false} showManage />
    </div>
    <div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
      <CustomersList />
    </div>
  </div>
)
