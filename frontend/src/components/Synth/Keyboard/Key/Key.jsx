import { KeyButton, BlackKeyButton } from './Key.style';
import React from 'react';

function Key({
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    isBlack,
    isActive,
    keyboardKey,
}) {
    return (
        <>
            {isBlack ? (
                <BlackKeyButton
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    $isActive={isActive}
                    $isBlack={isBlack}
                >
                    {keyboardKey.toUpperCase()}
                </BlackKeyButton>
            ) : (
                <KeyButton
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    $isActive={isActive}
                    $isBlack={isBlack}
                >
                    {keyboardKey.toUpperCase()}
                </KeyButton>
            )}
        </>
    );
}

export default React.memo(Key);
