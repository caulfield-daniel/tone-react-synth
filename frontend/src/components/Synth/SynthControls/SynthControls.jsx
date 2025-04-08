import ADSRControls from './ADSRControls.jsx';
import WaveformSelector from './WaveformSelector.jsx';
import styled from 'styled-components';

const SynthControlsPanel = styled.div`
    background-color: #2a2a2a;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export default function SynthControls() {
    return (
        <SynthControlsPanel>
            <WaveformSelector />
            <ADSRControls />
        </SynthControlsPanel>
    );
}
