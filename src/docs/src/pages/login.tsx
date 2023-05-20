import Layout from "@theme/Layout"
import React from "react"
import { Graphql } from "../components/main/graphql"
import { UserForm } from "../components/pages/login"

const Login = (): JSX.Element => (
  <Layout title="Login" description="Login to CHost.">
    <Graphql>
      <UserForm login />
    </Graphql>
  </Layout>
)

export default Login
