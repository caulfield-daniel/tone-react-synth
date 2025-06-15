import styled from 'styled-components';

export const VersionLabel = styled.div`
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
    user-select: none;
`;
export const SynthContainer = styled.div`
    position: relative;
    background: rgb(42, 42, 42);
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
