import styled from 'styled-components';

const KeyButton = styled.button`
    width: 70px;
    background-color: white;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    box-shadow: ${(props) =>
        props.$isActive ? 'inset 0 0 10px 3px rgba(0, 0, 0, 0.5)' : 'none'};
    z-index: 1;
    position: relative;
    touch-action: none; /* Блокировка тач-событий для мобильных устройств */
`;

const BlackKeyButton = styled(KeyButton)`
    width: 30px;
    height: 120px;
    background-color: #303030;
    border: none;
    box-shadow: ${(props) =>
        props.$isActive ? 'none' : '0 5px 3px 0 rgba(0, 0, 0, 1)'};
    z-index: 2;
    margin: 0 -15px; /* Позиционирование над белыми клавишами */
`;

export default function Key({
    onMouseDown,
    onMouseUp,
    onMouseEnter, // Добавлен новый обработчик
    onMouseLeave,
    isBlack,
    isActive,
}) {
    return (
        <>
            {isBlack ? (
                <BlackKeyButton
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter} // Передаем обработчик
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    $isActive={isActive}
                    $isBlack={isBlack}
                >
                    &nbsp;
                </BlackKeyButton>
            ) : (
                <KeyButton
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter} // Передаем обработчик
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    $isActive={isActive}
                    $isBlack={isBlack}
                >
                    &nbsp;
                </KeyButton>
            )}
        </>
    );
}
