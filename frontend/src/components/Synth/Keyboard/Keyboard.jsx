import Key from './Key.jsx';
import styled from 'styled-components';
import { useState } from 'react';
import { KEYBOARD_LAYOUT } from '../../../constants/keyboardLayout.js';

const Div = styled.div`
    background-color: #636363;
    height: 200px;
    display: flex;
    gap: 0.08rem;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    user-select: none;
`;

export default function Keyboard({ activeNotes, onNoteOn, onNoteOff }) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [keyboardActiveNotes, setKeyboardActiveNotes] = useState([]);

    const handleMouseDown = (fullNote) => {
        setIsMouseDown(true);
        setKeyboardActiveNotes([fullNote]);
        onNoteOn(fullNote);
    };

    const handleMouseEnter = (fullNote) => {
        if (isMouseDown && !keyboardActiveNotes.includes(fullNote)) {
            // Остановить предыдущие ноты и запустить новую
            keyboardActiveNotes.forEach((note) => onNoteOff(note));
            setKeyboardActiveNotes([fullNote]);
            onNoteOn(fullNote);
        }
    };

    const handleGlobalMouseUp = () => {
        if (isMouseDown) {
            // Остановить все активные ноты
            keyboardActiveNotes.forEach((note) => onNoteOff(note));
            setKeyboardActiveNotes([]);
            setIsMouseDown(false);
        }
    };

    return (
        <Div onMouseLeave={handleGlobalMouseUp} onMouseUp={handleGlobalMouseUp}>
            {KEYBOARD_LAYOUT.map((keyObj) => {
                const fullNote = `${keyObj.note}${keyObj.octave}`;
                return (
                    <Key
                        key={`${keyObj.note}-${keyObj.octave}`}
                        onMouseDown={() => handleMouseDown(fullNote)}
                        onMouseEnter={() => handleMouseEnter(fullNote)}
                        isActive={activeNotes.includes(fullNote)}
                        isBlack={keyObj.note.includes('#')}
                        keyboardKey={keyObj.key}
                    />
                );
            })}
        </Div>
    );
}
