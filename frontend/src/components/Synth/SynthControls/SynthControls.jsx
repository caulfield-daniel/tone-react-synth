import styled from 'styled-components';
import WaveformSelect from './WaveformSelect';

// const ControlsContainer = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//     grid-gap: 1.5rem;
//     margin-bottom: 2rem;
//     padding: 1rem;
//     border: 1px solid #666;
// `;

const ControlsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #666;
`

const ControlGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    width: 100%;
`;

const Label = styled.label`
    color: #c8c8c8;
    font-size: 0.8rem;
    text-align: left;
    margin: 0.2rem;
`;

const StyledInput = styled.input.attrs({ type: 'range' })`
    width: 100%;
    height: 5px;
    cursor: pointer;
`;

export default function SynthControls({ settings, onSettingsChange }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onSettingsChange({
            ...settings,
            [name]: Number(value),
        });
    };

    const handleWaveformChange = (value) => {
        onSettingsChange({
            ...settings,
            type: value,
        });
    };

    return (
        <ControlsContainer>
            <ControlGroup>
                <Label>waveform</Label>
                <WaveformSelect
                    value={settings.type}
                    onChange={handleWaveformChange}
                />
            </ControlGroup>

            <ControlGroup>
                <Label>volume ({settings.volume}dB)</Label>
                <StyledInput
                    name="volume"
                    min="-40"
                    max="0"
                    step="1"
                    value={settings.volume}
                    onChange={handleInputChange}
                />
            </ControlGroup>

            <ControlGroup>
                <Label>reverb ({settings.reverb})</Label>
                <StyledInput
                    name="reverb"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.reverb}
                    onChange={handleInputChange}
                />

                <Label>chorus ({settings.chorus})</Label>
                <StyledInput
                    name="chorus"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.chorus}
                    onChange={handleInputChange}
                />

                <Label>distortion ({settings.distortion})</Label>
                <StyledInput
                    name="distortion"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.distortion}
                    onChange={handleInputChange}
                />
            </ControlGroup>
        </ControlsContainer>
    );
}
