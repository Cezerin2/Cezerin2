import Layout from "@theme/Layout"
import React from "react"
import { Graphql } from "../components/main/graphql"
import { UserForm } from "../components/pages/login"

const Register = (): JSX.Element => (
  <Layout title="Register" description="Register to CHost.">
    <Graphql>
      <UserForm login={false} />
    </Graphql>
  </Layout>
)

export default Register
