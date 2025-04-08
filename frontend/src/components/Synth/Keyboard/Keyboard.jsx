import Key from './Key.jsx';
import styled from 'styled-components';
import { useState } from 'react';

const Div = styled.div`
    height: 200px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;
    user-select: none;
`;

export default function Keyboard() {
    const [activeKeys, setActiveKeys] = useState({});
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = (key) => {
        setIsMouseDown(true);
        setActiveKeys({ [key]: true });
    };

    const handleMouseEnter = (key) => {
        if (isMouseDown) {
            setActiveKeys({ [key]: true });
        }
    };

    const handleMouseUp = (key) => {
        setIsMouseDown(false);
        setActiveKeys({});
    };

    const handleGlobalMouseUp = () => {
        if (isMouseDown) {
            setIsMouseDown(false);
            setActiveKeys({});
        }
    };

    const handleGlobalMouseLeave = () => {
        if (isMouseDown) {
            setIsMouseDown(false);
            setActiveKeys({});
        }
    };

    const keys = [
        { note: 'C' },
        { note: 'C#' },
        { note: 'D' },
        { note: 'D#' },
        { note: 'E' },
        { note: 'F' },
        { note: 'F#' },
        { note: 'G' },
        { note: 'G#' },
        { note: 'A' },
        { note: 'A#' },
        { note: 'B' },
    ];

    return (
        <Div
            onMouseLeave={handleGlobalMouseLeave}
            onMouseUp={handleGlobalMouseUp}
        >
            {keys.map((keyObj) => (
                <Key
                    key={keyObj.note}
                    onMouseDown={() => handleMouseDown(keyObj.note)}
                    onMouseEnter={() => handleMouseEnter(keyObj.note)}
                    onMouseUp={() => handleMouseUp(keyObj.note)}
                    isActive={activeKeys[keyObj.note]}
                    isBlack={keyObj.note.endsWith('#')}
                >
                    &nbsp;
                </Key>
            ))}
        </Div>
    );
}
