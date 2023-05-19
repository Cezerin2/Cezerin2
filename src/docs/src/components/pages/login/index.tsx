import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useHistory } from "@docusaurus/router"
import React from "react"
import { Field, Form } from "react-final-form"

export const UserForm = ({ login }: { login: boolean }): JSX.Element => {
  const { push } = useHistory()
  const [submit, { data, loading, error }] = login
    ? useLazyQuery(gql`
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password)
        }
      `)
    : useMutation(
        gql`
          mutation Register($email: String!, $password: String!) {
            register(email: $email, password: $password) {
              id
              email
              stores {
                nodes {
                  id
                  paidUntil
                  settings {
                    domainName
                  }
                }
              }
            }
          }
        `,
        {
          onCompleted: () => {
            push("/dashboard")
          },
        }
      )

  if (loading) return <>Submitting...</>
  if (error) return <>Submission error! ${error.message}</>

  return (
    <Form
      onSubmit={variables => submit({ variables })}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h1>{login ? "Log In" : "Register"}</h1>
          <label>
            Email
            <Field name="email" component="input" placeholder="Email" />
          </label>
          <label>
            Password
            <Field name="password" component="input" placeholder="Password" />
          </label>
          <button type="submit">{login ? "Log In" : "Register"}</button>
        </form>
      )}
    />
  )
}
