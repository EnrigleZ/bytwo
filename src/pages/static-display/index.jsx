import React from 'react'
import { Card, Divider } from 'antd'

import HoverItem from './hover-item'
import PAGEIMAGE from '../../misc/page3.png'
import PCAIMAGE from '../../misc/pca.png'
import EFFECTIMAGE from '../../misc/effect.png'
import { TEXTS } from './logics'


const ImageAreaWithTips = () => {
    const [image, setImage] = React.useState(null)
    const [text, setText] = React.useState({title: '', description: ''})

    const onRefChange = React.useCallback((node) => {
        setTimeout(() => {setImage(node)}, 1)
    }, [setImage])

    return (
        <>
            <Card title="路径作用关系图">
                <div style={{position: "relative"}}>
                    <StaticPage ref={onRefChange}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[1]} left={0.015} top={0.26} h={0.1} w={0.12}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[2]} left={0.015} top={0.68} h={0.1} w={0.12}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[3]} left={0.25} top={0.02} h={0.1} w={0.18}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[4]} left={0.25} top={0.26} h={0.1} w={0.18}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[5]} left={0.26} top={0.8} h={0.1} w={0.15}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[6]} left={0.42} top={0.68} h={0.1} w={0.12}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[7]} left={0.75} top={0.78} h={0.1} w={0.15}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[8]} left={0.65} top={0.4} h={0.1} w={0.13}/>
                    <HoverItem setText={setText} image={image} text={TEXTS[9]} left={0.75} top={0.15} h={0.1} w={0.18}/>
                </div>
            </Card>
            <Divider />
            <Card title="路径分析">
                <b>{text.title}</b>
                <Divider hidden={!text.analysis} />
                <div><b hidden={!text.analysis}>分析：</b>{text.analysis}</div>
                <Divider hidden={!text.description} />
                <div><b hidden={!text.description}>结论：</b>{text.description}</div>
            </Card>
            <Divider />
            <Card title="探索性因子分析 ">
                <img className="page-image" src={PCAIMAGE} />
            </Card>
            <Divider />
            <Card title="验证性因子分析">
                <img style={{width: "80%"}} className="page-image" src={EFFECTIMAGE} />
            </Card>
        </>
    )
}

const StaticPage = React.forwardRef((props, ref) => {
    return <img style={{width: "60%"}} src={PAGEIMAGE} ref={ref}/>
})

export default ImageAreaWithTips