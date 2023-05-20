import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React, { FC, ReactNode } from "react"

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
})

export const Graphql: FC<{ children: ReactNode }> = ({ children }) => (
  <ApolloProvider client={client}>
    <main>{children}</main>
  </ApolloProvider>
)
