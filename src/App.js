/* @flow */

import React, { Component } from 'react';
import { AsyncStorage, Platform, View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { persistCache } from 'apollo-cache-persist';
import { Home, Attendance, Login } from './screens';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage,
  trigger: Platform.OS === 'web' ? 'write' : 'background',
});

const client = new ApolloClient({
  connectToDevTools: process.env.NODE_ENV === 'development',
  link: new HttpLink({
    uri: 'https://graphql-guc.now.sh/graphql',
  }),
  cache,
});

const darkTheme = {
  type: 'dark',
  primaryColor: 'blue',
  secondaryColor: 'blue',
  backgroundColor: '#3B4149',
  primaryTextColor: 'white',
  secondaryTextColor: 'rgba(255, 255, 255, 0.6)',
  sectionTitleColor: 'rgba(255,255,255,0.8)',
  cardBackgroundColor: '#767A80',
};

const lightTheme = {
  type: 'light',
  primaryColor: 'blue',
  secondaryColor: 'blue',
  backgroundColor: 'white',
  primaryTextColor: 'black',
  secondaryTextColor: 'rgba(0, 0, 0, 0.6)',
  sectionTitleColor: 'rgba(0,0,0,0.8)',
  cardBackgroundColor: 'white',
};

type State = {
  theme: Object,
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default class App extends Component<void, State> {
  state = { theme: darkTheme };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={this.state.theme.type === 'light' ? 'dark-content' : 'light-content'}
        />
        <ThemeProvider theme={this.state.theme}>
          <ApolloProvider client={client}>
            <Router>
              <View style={{ flex: 1 }}>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/feed" component={Home} />
                <PrivateRoute exact path="/attendance" component={Attendance} />
              </View>
            </Router>
            {/* <Home
              toggleTheme={() =>
                this.setState({ theme: this.state.theme === lightTheme ? darkTheme : lightTheme })
              }
            /> */}
          </ApolloProvider>
        </ThemeProvider>
      </View>
    );
  }
}
