import * as React from 'react';

interface HeroProps {
    className: string
    title: string
    content: string
}

const Hero: React.FC<HeroProps> = (props) => {
    return (
        <div className={props.className}>
            <h1 className="display-6 text-white">{props.title}</h1>
            <p className="lead text-white">{props.content}</p>
        </div>
    )
}

export default Hero