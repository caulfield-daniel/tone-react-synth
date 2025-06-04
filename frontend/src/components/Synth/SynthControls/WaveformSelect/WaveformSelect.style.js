import styled from 'styled-components';
import Select from 'react-select';

export const WaveformIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    gap: 10px;
    transition: background-color 0.1s ease-in-out;

    &:hover {
        background-color: #666;
    }
    svg {
        font-size: 36px;
        flex-shrink: 0;
    }
`;

export const StyledSelect = styled(Select)`
    display: flex;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #666;
    background: #555;
    color: white;
    z-index: 10;
    align-items: center;
    justify-content: center;

    .react-select__control {
        background: #555;
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
    }

    .react-select__value-container:hover {
        background-color: #666;
    }

    .react-select__single-value {
        color: white !important;
    }

    .react-select__menu {
        background: #55555577;
        cursor: pointer;
    }

    .react-select__menu-list {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
