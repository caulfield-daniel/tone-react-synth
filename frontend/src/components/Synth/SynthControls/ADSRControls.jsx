import styled from 'styled-components';

const ADSRControlsWrapper = styled.div`
    border: 1px solid #8b8b8b;
    display: flex;
    flex-direction: column;
`;

const Slider = styled.input``;

export default function ADSRControls() {
    return (
        <ADSRControlsWrapper>
            <Slider
                type="range"
                label="Attack"
                value={1}
                onChange={() => {}}
            ></Slider>
            <Slider
                type="range"
                label="Decay"
                value={1}
                onChange={() => {}}
            ></Slider>
            <Slider
                type="range"
                label="Sustain"
                value={1}
                onChange={() => {}}
            ></Slider>
            <Slider
                type="range"
                label="Release"
                value={1}
                onChange={() => {}}
            ></Slider>
        </ADSRControlsWrapper>
    );
}
