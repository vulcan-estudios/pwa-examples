import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from 'client/app/containers/App';
import Fridge from 'client/app/containers/Fridge';
import Recipes from 'client/app/containers/Recipes';
import Blending from 'client/app/containers/Blending';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Fridge} />
    <Route path='/recipes' component={Recipes} />
    <Route path='/blender/:recipeId' component={Blending} />
    <Redirect from='*' to='/' />
  </Route>
);
