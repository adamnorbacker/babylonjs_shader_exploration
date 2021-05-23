import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/index';

export const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="BabylonJS - %s" defaultTitle="BabylonJS">
        <meta name="description" content="BabylonJS - Shader Exploration" />
      </Helmet>
      <article>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </article>
      <GlobalStyle />
    </BrowserRouter>
  );
};
