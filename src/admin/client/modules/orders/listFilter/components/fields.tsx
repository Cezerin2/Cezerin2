import messages from "lib/text"
import MenuItem from "material-ui/MenuItem"
import SelectField from "material-ui/SelectField"
import React, { FC } from "react"
import style from "./style.css"

interface Props {
  isClosed
  isCancelled
  isDelivered
  isPaid
  isHold
  isDraft
  setClosed
  setCancelled
  setDelivered
  setPaid
  setHold
  setDraft
}

const Filter: FC<Props> = props => {
  const {
    isClosed,
    isCancelled,
    isDelivered,
    isPaid,
    isHold,
    isDraft,
    setClosed,
    setCancelled,
    setDelivered,
    setPaid,
    setHold,
    setDraft,
  } = props

  return (
    <div className={style.filter}>
      <SelectField
        className={style.select}
        fullWidth
        value={isDraft}
        onChange={(event, index, value) => {
          setDraft(value)
        }}
        floatingLabelText={messages.orders_draft}
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>

      <SelectField
        className={style.select}
        fullWidth
        value={isHold}
        onChange={(event, index, value) => {
          setHold(value)
        }}
        floatingLabelText={messages.orders_hold}
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>

      <SelectField
        className={style.select}
        fullWidth
        value={isPaid}
        onChange={(event, index, value) => {
          setPaid(value)
        }}
        floatingLabelText={messages.orders_paid}
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>

      <SelectField
        className={style.select}
        fullWidth
        value={isDelivered}
        onChange={(event, index, value) => {
          setDelivered(value)
        }}
        floatingLabelText={messages.orders_delivered}
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>

      <SelectField
        className={style.select}
        fullWidth
        value={isCancelled}
        onChange={(event, index, value) => {
          setCancelled(value)
        }}
        floatingLabelText={messages.orders_cancelled}
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>

      <SelectField
        className={style.select}
        fullWidth
        value={isClosed}
        onChange={(event, index, value) => {
          setClosed(value)
        }}
        floatingLabelText={messages.orders_closed}
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>
    </div>
  )
}

export default Filter
