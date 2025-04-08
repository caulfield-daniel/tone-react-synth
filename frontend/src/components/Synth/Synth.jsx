import Keyboard from './Keyboard/Keyboard.jsx';
import SynthControls from './SynthControls/SynthControls.jsx';
import styled from 'styled-components';
import { useState, useEffect, use } from 'react';

const SynthContainer = styled.div`
    background-color: #3c3c3c;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default function Synth() {
    return (
        <SynthContainer>
            <SynthControls />
            <Keyboard />
        </SynthContainer>
    );
}
