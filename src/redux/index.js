import { createStore } from 'redux'
import { message } from 'antd'

import myReducer from './reducer'
import { updateConfig } from './action'

export const store = createStore(myReducer)

export const mapStateToProps = ({ config }) => {
    return { ...config }
}

export const mapDispatchToProps = (dispatch, ownProps) => ({
    update: (modelName, dataset, weightDecay) => {
        const config = { modelName, dataset, weightDecay }
        dispatch(updateConfig(config))
        message.success("配置已修改")
    }
})