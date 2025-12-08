import { ControlGroup, Label, StyledInput } from './SynthControls.style';

const ENVELOPE_CONFIG = {
    attack: { min: 0, max: 5, step: 0.01 },
    decay: { min: 0, max: 2, step: 0.01 },
    sustain: { min: 0, max: 1, step: 0.01 },
    release: { min: 0, max: 5, step: 0.01 },
};

export default function EnvelopeControl({ envelope, onChange }) {
    const handleChange = (key, value) => {
        onChange({ ...envelope, [key]: Number(value) });
    };

    return (
        <ControlGroup>
            {Object.entries(ENVELOPE_CONFIG).map(([key, config]) => (
                <div key={key}>
                    <Label>
                        {key} ({envelope[key]})
                    </Label>
                    <StyledInput
                        min={config.min}
                        max={config.max}
                        step={config.step}
                        value={envelope[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                </div>
            ))}
        </ControlGroup>
    );
}
