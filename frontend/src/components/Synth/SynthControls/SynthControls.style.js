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
    transition: all 0.1s ease;
`;

export const EffectToggleButton = styled.button`
    outline: none;
    user-select: none;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 4%;
    top: 10%;
    border: 1px solid rgb(70, 70, 70);
    background-color: transparent;
    cursor: pointer;

    &:hover {
        border-color: rgba(255, 255, 255, 0.5);
    }
`;

export const EffectControlGroup = styled(ControlGroup)`
    position: relative;
    border-color: ${(props) =>
        props.$isActive ? 'rgb(138, 255, 152)' : 'rgb(70, 70, 70)'};

    box-shadow: ${(props) =>
        props.$isActive ? '0 0 7px 3px rgba(138, 255, 152, 0.5)' : 'none'};

    &:hover {
        border-color: ${(props) =>
            props.$isActive
                ? 'rgb(138, 255, 152)'
                : 'rgba(255, 255, 255, 0.5)'};
    }
`;

export const Label = styled.label`
    color: #c8c8c8;
    font-size: 0.8rem;
    text-align: left;
    margin: 0.6rem;
    user-select: none;
`;

export const StyledInput = styled.input.attrs({ type: 'range' })`
    outline: none;
    user-select: none;
    height: 10px;
    margin: auto;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 10px;
        height: 20px;
        background: rgba(138, 255, 152);
        border-radius: 0;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:hover {
            box-shadow: 0 0 10px 3px rgba(138, 255, 152, 0.5);
        }
    }

    &::-webkit-slider-runnable-track {
        border: ${(props) =>
            !props.disabled
                ? '1px solid transparent'
                : '1px solid rgb(70, 70, 70)'};
        transition: border-color 0.1s ease-in-out;
        &:hover {
            border-color: rgba(255, 255, 255, 0.5);
        }
    }

    &::-moz-range-thumb {
        appearance: none;
        width: 10px;
        height: 15px;
        background: ${(props) =>
            !props.disabled ? 'rgba(138, 255, 152)' : 'rgb(70, 70, 70)'};
        border-radius: 0;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

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
        transition: all 0.1s ease-in-out;

        &:hover {
            box-shadow: 0 0 10px 3px rgba(138, 255, 152, 0.5);
        }
    }
`;
