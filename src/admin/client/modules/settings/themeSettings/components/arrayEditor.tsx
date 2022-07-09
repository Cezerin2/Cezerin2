import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import FontIcon from "material-ui/FontIcon"
import Paper from "material-ui/Paper"
import React, { FC } from "react"
import DynamicEditControl from "./dynamicEditControl"
import style from "./style.css"

interface Props {
  label
  properties
  fields
  meta: { touched; error; submitFailed }
}

const ArrayEditor: FC<Props> = props => {
  const {
    label,
    properties,
    fields,
    meta: { touched, error, submitFailed },
  } = props

  return (
    <div>
      <div className={style.arrayTitle}>
        {label}
        <FloatingActionButton
          mini
          secondary
          onClick={() => fields.push({})}
          style={{ marginLeft: "20px" }}
        >
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
      </div>

      <ol style={{ listStyle: "none" }}>
        {fields.map((field, index) => (
          <li key={index}>
            <Paper
              style={{ margin: "20px 0 20px 20px", backgroundColor: "#f7f7f7" }}
              zDepth={1}
            >
              <div className={style.arrayItemHead}>
                <FlatButton
                  label={messages.actions_delete}
                  secondary
                  onClick={() => fields.remove(index)}
                />

                {index > 0 && (
                  <FlatButton
                    label={messages.actions_moveUp}
                    onClick={() => fields.move(index, index - 1)}
                  />
                )}

                {index + 1 < fields.length && (
                  <FlatButton
                    label={messages.actions_moveDown}
                    onClick={() => fields.move(index, index + 1)}
                  />
                )}
              </div>

              <div className={style.arrayInnerBox}>
                {properties.map((property, propertyIndex) => {
                  const fieldName = `${field}.${property.key}`
                  return (
                    <DynamicEditControl
                      key={propertyIndex}
                      type={property.type}
                      fieldName={fieldName}
                      label={property.label}
                      options={property.options}
                      properties={property.properties}
                    />
                  )
                })}
              </div>
            </Paper>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ArrayEditor
