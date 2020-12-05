import { UpdateConfig } from './action'

const initState = {
    config: {
        modelName: "PAKT",
        dataset: "assist2009",
        weightDecay: false
    }
}

export default (state = initState, action) => {
    const { config } = action
    switch (action.type) {
        case UpdateConfig: {
            return {...state, config }
        }

        default: return state

    }
}
