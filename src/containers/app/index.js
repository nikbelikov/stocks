import React from 'react';
import { Route } from 'react-router-dom'
import Stocks from '../stocks'

const App = () => (
  <div>
   <main>
      <Route exact path="/" component={Stocks} />
    </main>
  </div>
);

export default App
