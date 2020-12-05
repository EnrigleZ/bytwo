import React from 'react'
import { connect } from 'react-redux'

import { mapStateToProps } from '../../redux'

const HomePage = (props) => {
    console.log(props)
    return '132'
}

export default connect(mapStateToProps)(HomePage)
