import { gql, useQuery } from "@apollo/client"
import Layout from "@theme/Layout"
import React from "react"
import { Graphql } from "../components/main/graphql"

const DashboardPage = (): JSX.Element => {
  const { loading, error, data } = useQuery(gql`
    {
      user {
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
  `)

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <>
      User ID: {data.user.id}
      <br />
      User email: {data.email}
      <br />
      Stores
      <table>
        <tr>
          <th>ID</th>
          <th>Paid Until</th>
          <th>Domain Names</th>
        </tr>
        {data.user.stores.nodes.map(({ id, paidUntil, settings }) => (
          <tr>
            <th>{id}</th>
            <th>{paidUntil}</th>
            <th>{settings.domainName}</th>
          </tr>
        ))}
      </table>
    </>
  )
}

const Dashboard = (): JSX.Element => (
  <Layout title="Dashboard">
    <Graphql>
      <DashboardPage />
    </Graphql>
  </Layout>
)

export default Dashboard
