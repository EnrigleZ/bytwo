import React from 'react'
import { getSize } from './logics'

const HoverItem = (props) => {
    const { text, image, top, left, w, h, setText } = props
    const [ width, height ] = getSize(image)
    console.log(width, height)
    const [display, setDisplay] = React.useState(false)
    if (!image) return null

    return (
        <div
            className="hover-item"
            style={{ left: width * left, top: height * top, width: width * w, height: height * h}}
            onMouseEnter={() => {setDisplay(true)}}
            onMouseLeave={() => {setDisplay(false)}}
            onClick={() => { setText(text) }}
        >
            {/* <span className="text" hidden={!display}>{text.toString()}</span> */}
        </div>
    )
}

export default HoverItem
