// PresetManager.style.js
import styled from 'styled-components';

// Основной контейнер панели PresetManager
export const PMContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid rgb(70, 70, 70);
    background-color: transparent;
`;

// Кнопка с иконкой
export const PMButton = styled.button`
    outline: none;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.2rem; /* размер иконки */
    background-color: transparent;
    color: #c8c8c8;
    border: 1px solid rgb(70, 70, 70);
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 0.1s ease, box-shadow 0.1s ease,
        background-color 0.1s ease;

    &:hover {
        border-color: rgba(255, 255, 255, 0.5);
        background-color: rgba(255, 255, 255, 0.05);
    }
    &:active {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    }
    &:disabled {
        color: rgb(100, 100, 100);
        border-color: rgb(50, 50, 50);
        cursor: not-allowed;
    }
`;

// Поле ввода текста для имени пресета
export const PMTextInput = styled.input.attrs({ type: 'text' })`
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
    color: #c8c8c8;
    background-color: transparent;
    border: 1px solid rgb(70, 70, 70);
    border-radius: 4px;
    transition: border-color 0.1s ease;
    width: 150px;

    &::placeholder {
        color: rgb(100, 100, 100);
    }
    &:focus {
        border-color: rgba(138, 255, 152, 0.8);
    }
    &:hover {
        border-color: rgba(255, 255, 255, 0.5);
    }
`;

// Скрытый input[type="file"]
export const HiddenFileInput = styled.input.attrs({ type: 'file' })`
    display: none;
`;

// Селект для выбора пресета
export const PMSelect = styled.select`
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
    color: #c8c8c8;
    background-color: transparent;
    border: 1px solid rgb(70, 70, 70);
    border-radius: 4px;
    transition: border-color 0.1s ease;
    &:hover {
        border-color: rgba(255, 255, 255, 0.5);
    }
    &:focus {
        border-color: rgba(138, 255, 152, 0.8);
    }
    option {
        background-color: #1e1e1e;
        color: #c8c8c8;
    }
`;

// Группа для label + поле
export const PMGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

// Label для полей
export const PMLabel = styled.label`
    color: #c8c8c8;
    font-size: 0.8rem;
    user-select: none;
    margin-bottom: 0.2rem;
`;
