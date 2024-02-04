import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views";
import "./App.scss";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer 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`,
  },
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
