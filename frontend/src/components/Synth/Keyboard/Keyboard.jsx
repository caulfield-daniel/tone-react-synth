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

export default function Keyboard({
    activeNotes,
    onNoteOn,
    onNoteOff,
    onClearNotes,
}) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const handleMouseDown = (fullNote) => {
        setIsMouseDown(true);
        setCurrentNote(fullNote);
        onNoteOn(fullNote);
    };

    const handleMouseEnter = (fullNote) => {
        if (isMouseDown && fullNote !== currentNote) {
            // Остановить предыдущую ноту
            if (currentNote) onNoteOff(currentNote);
            // Запустить новую
            setCurrentNote(fullNote);
            onNoteOn(fullNote);
        }
    };

    const handleGlobalMouseUp = () => {
        if (isMouseDown) {
            // Остановить все ноты при отпускании мыши
            onClearNotes();
            setIsMouseDown(false);
            setCurrentNote(null);
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
