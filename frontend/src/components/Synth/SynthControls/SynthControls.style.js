import styled from 'styled-components';

export const ControlsContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid rgb(70, 70, 70);
`;

export const ControlGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    width: 150px;
    height: auto;
    border: 1px solid rgb(70, 70, 70);
    flex-grow: 1;
    padding: 0.5rem;
    padding-bottom: 2rem;
`;

export const Label = styled.label`
    color: #c8c8c8;
    font-size: 0.8rem;
    text-align: left;
    margin: 0.6rem;
    user-select: none;
`;

export const StyledInput = styled.input.attrs({ type: 'range' })`
    height: 10px;
    cursor: pointer;
    margin: auto;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 10px;
        height: 20px;
        background: rgb(138, 255, 152);
        border-radius: 0;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:hover {
            box-shadow: 0 0 10px 3px rgba(138, 255, 152, 0.5);
        }
    }

    &::-webkit-slider-runnable-track {
        border: 1px solid transparent;
        transition: border-color 0.15s ease-in-out;
        &:hover {
            border-color: rgb(138, 255, 152);
        }
    }

    &::-moz-range-thumb {
        appearance: none;
        width: 10px;
        height: 15px;
        background: rgb(138, 255, 152);
        border-radius: 0;
        cursor: pointer;
        transition: all 0.15s ease-in-out;

        &:hover {
            box-shadow: 0 0 10px 3px rgba(138, 255, 152, 0.5);
        }
    }

    &::-ms-thumb {
        appearance: none;
        width: 10px;
        height: 15px;
        background: rgb(138, 255, 152);
        border-radius: 0;
        cursor: pointer;
        transition: all 0.15s ease-in-out;

        &:hover {
            box-shadow: 0 0 10px 3px rgba(138, 255, 152, 0.5);
        }
    }
`;
