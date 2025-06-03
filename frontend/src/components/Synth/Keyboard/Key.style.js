import styled from 'styled-components';

export const KeyButton = styled.button`
    padding-top: 90px;
    color: #9a9a9a;
    font-size: ${(props) => (props.$isActive ? '20px' : '16px')};
    outline: none;
    border: none;
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

export const BlackKeyButton = styled(KeyButton)`
    width: 29px;
    height: 120px;
    background-color: #303030;
    box-shadow: ${(props) =>
        props.$isActive ? 'none' : '0 5px 3px 0 rgba(0, 0, 0, 1)'};
    z-index: 2;
    margin: 0 -15px;
`;
