import data from "lib/data"
import messages from "lib/text"
import MenuItem from "material-ui/MenuItem"
import { CustomToggle } from "modules/shared/form"
import React from "react"
import { Field } from "redux-form"
import { SelectField, TextField } from "redux-form-material-ui"

const timezoneItems = []
for (const key in data.timezones) {
  const { utc } = data.timezones[key]
  const utcPretty = `${utc.slice(0, -2)}:${utc.slice(-2)}`
  timezoneItems.push(
    <MenuItem value={key} key={key} primaryText={`(UTC${utcPretty}) ${key}`} />
  )
}

const countryItems = []
for (const key in data.countries) {
  countryItems.push(
    <MenuItem value={key} key={key} primaryText={data.countries[key]} />
  )
}

export const fields = [
  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">
      {messages.settings_currencyFormatting}
    </div>
    <div className="col-xs-12 col-sm-6">
      <Field
        component={TextField}
        fullWidth
        name="currency_format"
        floatingLabelText={messages.settings_currencyFormatting}
      />

      <Field
        component={TextField}
        fullWidth
        name="currency_symbol"
        floatingLabelText={messages.settings_currencySymbol}
      />

      <Field
        component={SelectField}
        autoWidth
        floatingLabelFixed
        fullWidth
        name="thousand_separator"
        floatingLabelText={messages.settings_thousandSeparator}
      >
        <MenuItem value="." primaryText="5.000.000" />
        <MenuItem value="," primaryText="5,000,000" />
        <MenuItem value=" " primaryText="5 000 000" />
        <MenuItem value="" primaryText="5000000" />
      </Field>

      <Field
        component={SelectField}
        autoWidth
        fullWidth
        name="decimal_separator"
        floatingLabelText={messages.settings_decimalSeparator}
      >
        <MenuItem value="." primaryText="100.00" />
        <MenuItem value="," primaryText="100,00" />
      </Field>

      <Field
        component={SelectField}
        autoWidth
        fullWidth
        name="decimal_number"
        floatingLabelText={messages.settings_numberOfDecimal}
      >
        <MenuItem value={0} primaryText="100" />
        <MenuItem value={1} primaryText="100.0" />
        <MenuItem value={2} primaryText="100.00" />
        <MenuItem value={3} primaryText="100.000" />
        <MenuItem value={4} primaryText="100.0000" />
      </Field>
    </div>
  </div>,
  <Field
    component={CustomToggle}
    name="tax_included"
    label={messages.settings_taxIncluded}
    style={{ paddingTop: 16, paddingBottom: 16 }}
  />,

  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.settings_taxRate}</div>
    <div className="col-xs-12 col-sm-6">
      <Field
        component={TextField}
        fullWidth
        name="tax_rate"
        type="number"
        placeholder="0"
      />
    </div>
  </div>,

  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.settings_timezone}</div>
    <div className="col-xs-12 col-sm-6">
      <Field component={SelectField} autoWidth fullWidth name="timezone">
        {timezoneItems}
      </Field>
    </div>
  </div>,

  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.settings_dateFormat}</div>
    <div className="col-xs-12 col-sm-6">
      <Field component={SelectField} autoWidth fullWidth name="date_format">
        <MenuItem value="MMMM D, YYYY" primaryText="January 30, 2017" />
        <MenuItem value="D MMMM YYYY" primaryText="30 January 2017" />
        <MenuItem value="YYYY-MM-DD" primaryText="2017-01-30" />
        <MenuItem value="YYYY-M-D" primaryText="2017-1-30" />
        <MenuItem value="MM/DD/YYYY" primaryText="01/30/2017" />
        <MenuItem value="MM.DD.YYYY" primaryText="01.30.2017" />
        <MenuItem value="DD/MM/YYYY" primaryText="30/01/2017" />
        <MenuItem value="DD.MM.YYYY" primaryText="30.01.2017" />
      </Field>
    </div>
  </div>,

  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.settings_timeFormat}</div>
    <div className="col-xs-12 col-sm-6">
      <Field component={SelectField} autoWidth fullWidth name="time_format">
        <MenuItem value="h:mm a" primaryText="2:30 pm" />
        <MenuItem value="h:mm A" primaryText="2:30 PM" />
        <MenuItem value="HH:mm" primaryText="14:30" />
      </Field>
    </div>
  </div>,
  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.settings_weightUnit}</div>
    <div className="col-xs-12 col-sm-6">
      <Field component={SelectField} autoWidth fullWidth name="weight_unit">
        <MenuItem value="g" primaryText={`${messages.settings_gram} (g)`} />
        <MenuItem
          value="kg"
          primaryText={`${messages.settings_kilogram} (kg)`}
        />
        <MenuItem value="lb" primaryText={`${messages.settings_pound} (lb)`} />
        <MenuItem value="oz" primaryText={`${messages.settings_ounce} (oz)`} />
      </Field>
    </div>
  </div>,
  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.settings_lengthUnit}</div>
    <div className="col-xs-12 col-sm-6">
      <Field component={SelectField} autoWidth fullWidth name="length_unit">
        <MenuItem
          value="cm"
          primaryText={`${messages.settings_centimeter} (cm)`}
        />
        <MenuItem value="in" primaryText={`${messages.settings_inch} (in)`} />
      </Field>
    </div>
  </div>,
  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">
      {messages.settings_defaultProductSorting}
    </div>
    <div className="col-xs-12 col-sm-6">
      <Field
        component={TextField}
        fullWidth
        name="default_product_sorting"
        placeholder="-position,stock_status,price"
      />
    </div>
  </div>,

  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.productFields}</div>
    <div className="col-xs-12 col-sm-6">
      <Field
        component={TextField}
        fullWidth
        name="product_fields"
        placeholder="id,path,name,price, ..."
      />
    </div>
  </div>,

  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.productsLimit}</div>
    <div className="col-xs-12 col-sm-6">
      <Field
        component={TextField}
        fullWidth
        name="products_limit"
        type="number"
        placeholder="30"
      />
    </div>
  </div>,

  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">
      {messages.settings_defaultShippingCountry}
    </div>
    <div className="col-xs-12 col-sm-6">
      <Field
        component={SelectField}
        autoWidth
        fullWidth
        name="default_shipping_country"
      >
        {countryItems}
      </Field>
    </div>
  </div>,
  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">
      {messages.settings_defaultShippingState}
    </div>
    <div className="col-xs-12 col-sm-6">
      <Field component={TextField} fullWidth name="default_shipping_state" />
    </div>
  </div>,
  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">
      {messages.settings_defaultShippingCity}
    </div>
    <div className="col-xs-12 col-sm-6">
      <Field component={TextField} fullWidth name="default_shipping_city" />
    </div>
  </div>,
  <Field
    component={CustomToggle}
    name="hide_billing_address"
    label={messages.hideBillingAddress}
    style={{ paddingTop: 16, paddingBottom: 16 }}
  />,
  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.domain}</div>
    <div className="col-xs-12 col-sm-6">
      <Field
        component={TextField}
        fullWidth
        name="domain"
        placeholder="https://domain.com"
      />
    </div>
  </div>,
  <div className="row between-xs middle-xs">
    <div className="col-xs-12 col-sm-6">{messages.orderEmailCopyTo}</div>
    <div className="col-xs-12 col-sm-6">
      <Field
        component={TextField}
        fullWidth
        name="order_confirmation_copy_to"
      />
    </div>
  </div>,
]
