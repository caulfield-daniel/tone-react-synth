import { WaveformIconContainer, StyledSelect } from './WaveformSelect.style';
import {
    PiWaveSawtooth,
    PiWaveSine,
    PiWaveSquare,
    PiWaveTriangle,
} from 'react-icons/pi';

const options = [
    {
        value: 'sine',
        label: 'sine',
        icon: <PiWaveSine />,
    },
    {
        value: 'square',
        label: 'square',
        icon: <PiWaveSquare />,
    },
    {
        value: 'sawtooth',
        label: 'sawtooth',
        icon: <PiWaveSawtooth />,
    },
    {
        value: 'triangle',
        label: 'triangle',
        icon: <PiWaveTriangle />,
    },
];

const CustomOption = ({ innerProps, data }) => (
    <WaveformIconContainer {...innerProps}>
        {data.icon}
        {/* {data.label} */}
    </WaveformIconContainer>
);

const CustomSingleValue = ({ data }) => (
    <WaveformIconContainer>
        {data.icon}
        {/* {data.label} */}
    </WaveformIconContainer>
);

export default function WaveformSelect({ value, onChange }) {
    return (
        <StyledSelect
            classNamePrefix="react-select"
            options={options}
            components={{
                Option: CustomOption,
                SingleValue: CustomSingleValue,
            }}
            isSearchable={false}
            value={options.find((opt) => opt.value === value)}
            onChange={(selected) => onChange(selected.value)}
        />
    );
}
