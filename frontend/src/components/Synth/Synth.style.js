import styled from 'styled-components';

export const SynthContainer = styled.div`
    background: #424242;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    max-width: 800px;
    margin: 2rem auto;
`;

export const NoteIndicator = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-family: monospace;
`;
