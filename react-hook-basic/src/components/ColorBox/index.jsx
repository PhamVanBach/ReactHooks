import React, { useState } from 'react';
import './ColorBox.scss';

ColorBox.propTypes = {

};

function getRandomColor() {
    const COLOR_LIST = ["red", "green", "blue", "yellow"]
    const randomColorIndex = Math.trunc(Math.random() * 5)
    return COLOR_LIST[randomColorIndex]
}

function ColorBox() {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'deeppink'
        console.log(initColor)
        return initColor
    })

    function handleBoxClick() {
        const newColor = getRandomColor();
        setColor(newColor)
        localStorage.setItem('box_color', newColor)
    }

    return (
        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >
        </div>
    );
}

export default ColorBox;