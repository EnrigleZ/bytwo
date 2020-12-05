import { createStore } from 'redux'
import myReducer from './reducer'

export const store = createStore(myReducer)

export const mapStateToProps = ({ config }) => {
    console.log(config)
    return { config }
}
