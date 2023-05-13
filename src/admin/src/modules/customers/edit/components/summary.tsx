import * as helper from "lib/helper"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useState } from "react"
import style from "./style.sass"
import SummaryForm from "./summaryForm"

interface Props {
  customer
  settings
  onCustomerSummaryUpdate
}

const CustomerSummary: FC<Props> = props => {
  const [openSummaryEdit, setOpenSummaryEdit] = useState(false)

  const { customer, settings, onCustomerSummaryUpdate } = props

  const hideSummaryEdit = () => setOpenSummaryEdit(false)

  const saveSummaryEdit = customer => {
    onCustomerSummaryUpdate(customer)
    hideSummaryEdit()
  }

  const totalSpent = helper.formatCurrency(customer.total_spent, settings)

  return (
    <Paper className="paper-box" zDepth={1}>
      <div className={style.innerBox}>
        <div
          className={style.customerName}
          style={{ paddingBottom: 26, paddingTop: 0 }}
        >
          {customer.full_name}
          <div>
            <small>{customer.group_name}</small>
          </div>
        </div>

        <div className={`${style.summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.email}</span>
          </div>
          <div className="col-xs-7">
            <a href={`MailTo:${customer.email}`} className={style.link}>
              {customer.email}
            </a>
          </div>
        </div>

        <div className={`${style.summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.mobile}</span>
          </div>
          <div className="col-xs-7">{customer.mobile}</div>
        </div>

        <div className={`${style.summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.customers_totalSpent}</span>
          </div>
          <div className="col-xs-7">{totalSpent}</div>
        </div>

        <div className={`${style.summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.note}</span>
          </div>
          <div className="col-xs-7">{customer.note}</div>
        </div>

        <div style={{ marginTop: 20 }}>
          <RaisedButton
            label="Edit"
            style={{ marginRight: 15 }}
            onClick={() => setOpenSummaryEdit(true)}
          />
        </div>

        <Dialog
          title={messages.customers_titleEdit}
          modal={false}
          open={openSummaryEdit}
          onRequestClose={hideSummaryEdit}
          contentStyle={{ width: 600 }}
        >
          <SummaryForm
            initialValues={customer}
            onCancel={hideSummaryEdit}
            onSubmit={saveSummaryEdit}
          />
        </Dialog>
      </div>
    </Paper>
  )
}

export default CustomerSummary
