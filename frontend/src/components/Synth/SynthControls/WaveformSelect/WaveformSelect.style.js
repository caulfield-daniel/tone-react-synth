import styled from 'styled-components';
import Select from 'react-select';

export const WaveformIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background-color: transparent;
    border: 1px solid transparent;
    transition: background-color 0.1s ease-in-out;
    transition: border-color 0.1s ease-in-out;
    &:hover {
        border-color: rgb(138, 255, 152);
    }

    svg {
        font-size: 48px;
        flex-shrink: 0;
        color: rgb(138, 255, 152);
    }
`;

export const StyledSelect = styled(Select)`
    display: flex;
    font-size: 1rem;
    border-radius: 4px;
    color: white;
    z-index: 10;
    align-items: center;
    justify-content: center;
    height: 100%;

    .react-select__control {
        background: transparent;
        border: none;
        box-shadow: none;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .react-select__indicator-separator {
        display: none;
    }

    .react-select__indicator {
        display: none;
    }

    .react-select__value-container {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.1s ease-in-out;
        transition: border-color 0.1s ease-in-out;
        height: 100%;
    }

    .react-select__menu {
        background: rgb(47, 47, 47);
        width: auto;
        cursor: pointer;
    }

    .react-select__menu-list {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
