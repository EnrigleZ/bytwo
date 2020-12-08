import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux'

import 'antd/dist/antd.css'
import MyLayout from './layout'

import HomePage from './pages/home'
import TestsetPrediction from './pages/test-pred'
import TailPrediction from './pages/tail-pred'
// import PredictStepPage from './pages/case-pred/pred-step'
// import PredictExercisePage from './pages/case-pred/pred-exercise'

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <BrowserRouter>
          <MyLayout>
            <Switch>
              <Route path="/test-pred" component={TestsetPrediction} />
              <Route path="/tail-pred" component={TailPrediction} />
              <Route path="/" component={TestsetPrediction} />
            </Switch>
          </MyLayout>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App
