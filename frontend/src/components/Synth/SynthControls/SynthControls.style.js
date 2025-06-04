import styled from 'styled-components';

export const ControlsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #666;

`;

export const ControlGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    width: 150px;
    height: 150px;
    border: 1px solid #666;
`;

export const Label = styled.label`
    color: #c8c8c8;
    font-size: 0.8rem;
    text-align: left;
    margin: 0.2rem;
    user-select: none;
`;

export const StyledInput = styled.input.attrs({ type: 'range' })`
    width: 95%;
    height: 5px;
    cursor: pointer;
`;
