import styled from 'styled-components';
import Select from 'react-select';

export const PMGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;
export const PMButtonsGroup = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const PMInputSelectGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`;

export const PMContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0.75rem 0.5rem;
    border: 1px solid rgb(70, 70, 70);
    background-color: transparent;
    justify-content: space-between;
`;

export const PMButton = styled.button`
    outline: none;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.2rem;
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

export const PMTextInput = styled.input.attrs({ type: 'text' })`
    outline: none;
    font-size: 1rem;
    padding: 0.4rem 0.6rem;
    height: 2rem;
    background: transparent;
    color: white;
    border: 1px solid rgb(70, 70, 70);
    border-radius: 4px;
    transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    &:hover {
        border-color: rgba(255, 255, 255, 0.5);
    }
    &:focus {
        border-color: rgba(138, 255, 152, 0.8);
        box-shadow: 0 0 0 1px rgba(138, 255, 152, 0.5);
    }
    &::placeholder {
        color: #c8c8c8;
    }
    &:disabled {
        border-color: rgb(70, 70, 70);
        color: #666;
        background: rgba(255, 255, 255, 0.05);
        cursor: not-allowed;
    }
`;

// Стили для react-select, чтобы селект в PresetManager выглядел аналогично ControlGroup
export const PMSelect = styled(Select).attrs({
    classNamePrefix: 'react-select',
})`
    .react-select__control {
        outline: none;
        font-size: 1rem;
        width: 10rem;
        height: 3rem;
        background: transparent;
        border: 1px solid rgb(70, 70, 70);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:hover {
            border-color: rgba(255, 255, 255, 0.5);
        }
    }

    .react-select__control--is-focused {
        border-color: rgba(138, 255, 152, 0.8);
        box-shadow: 0 0 0 1px rgba(138, 255, 152, 0.5);
    }
    .react-select__control--is-disabled {
        border-color: rgb(70, 70, 70);
        background: rgba(255, 255, 255, 0.05);
        cursor: not-allowed;
    }

    .react-select__value-container {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.1s ease-in-out;
        transition: border-color 0.1s ease-in-out;
        height: 100%;
    }
    .react-select__single-value {
        color: white;
        font-size: 1rem;
    }
    .react-select__indicator-separator,
    .react-select__dropdown-indicator {
        display: none;
    }

    .react-select__menu {
        background: rgb(47, 47, 47);
        border: 1px solid rgb(70, 70, 70);
        border-radius: 4px;
        margin-top: 0.2rem;
        z-index: 100;
        width: 100%;
    }
    .react-select__menu-list {
        max-height: 200px;
        overflow-y: auto;
        padding: 0;

        &::-webkit-scrollbar {
            width: 7px;
        }
        &::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }
        &::-webkit-scrollbar-thumb {
            background-color: rgb(138, 255, 152);
            border-radius: 3px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
    .react-select__option {
        color: white;
        background-color: transparent;
        padding: 0.4rem 0.6rem;
        cursor: pointer;
    }
    .react-select__option--is-focused {
        background-color: rgba(255, 255, 255, 0.1);
    }
    .react-select__option--is-selected {
        background-color: rgba(138, 255, 152, 0.3);
    }
    .react-select__group-heading {
        color: #c8c8c8;
        font-size: 0.7rem;
        padding: 0.4rem 0.6rem;
        background: rgba(70, 70, 70, 0.2);
    }

    .react-select__placeholder {
        color: #c8c8c8;
    }
`;

export const HiddenFileInput = styled.input.attrs({ type: 'file' })`
    display: none;
`;

export const PMLabel = styled.label`
    color: #c8c8c8;
    font-size: 0.8rem;
    user-select: none;
`;
