import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css'
import MyLayout from './layout'

import HomePage from './pages/home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyLayout>
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </MyLayout>
      </BrowserRouter>
    </div>
  );
}

export default App
