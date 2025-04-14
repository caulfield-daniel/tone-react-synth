import styled from 'styled-components';

const ControlsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const ControlGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    color: white;
    font-size: 0.9rem;
`;

const StyledInput = styled.input`
    width: 100%;
    cursor: pointer;
`;

const StyledSelect = styled.select`
    width: 100%;
    padding: 0.3rem;
    border-radius: 4px;
    border: 1px solid #666;
    background: #555;
    color: white;
`;

export default function SynthControls({ settings, onSettingsChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onSettingsChange({
            ...settings,
            [name]: name === 'type' ? value : Number(value),
        });
    };

    return (
        <ControlsContainer>
            <ControlGroup>
                <Label>Waveform</Label>
                <StyledSelect
                    name="type"
                    value={settings.type}
                    onChange={handleChange}
                >
                    {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
                        <option key={type} value={type}>
                            {type.toUpperCase()}
                        </option>
                    ))}
                </StyledSelect>
            </ControlGroup>

            <ControlGroup>
                <Label>Volume ({settings.volume}dB)</Label>
                <StyledInput
                    type="range"
                    name="volume"
                    min="-40"
                    max="0"
                    step="1"
                    value={settings.volume}
                    onChange={handleChange}
                />
            </ControlGroup>

            <ControlGroup>
                <Label>Reverb ({settings.reverb})</Label>
                <StyledInput
                    type="range"
                    name="reverb"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.reverb}
                    onChange={handleChange}
                />
            </ControlGroup>

            <ControlGroup>
                <Label>Chorus ({settings.chorus})</Label>
                <StyledInput
                    type="range"
                    name="chorus"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.chorus}
                    onChange={handleChange}
                />
            </ControlGroup>

            <ControlGroup>
                <Label>Distortion ({settings.distortion})</Label>
                <StyledInput
                    type="range"
                    name="distortion"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.distortion}
                    onChange={handleChange}
                />
            </ControlGroup>
        </ControlsContainer>
    );
}
