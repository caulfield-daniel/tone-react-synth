import styled from 'styled-components';

const WaveformSelectorWrapper = styled.div`
    border: 1px solid #8b8b8b;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Selector = styled.select`
    background-color: transparent;
    width: 100%;
    height: 100%;
    font-size: 16px;
    text-align: center;
    outline: none;
`;

export default function WaveformSelector() {
    return (
        <WaveformSelectorWrapper>
            <Selector>
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
                <option value="sawtooth">Saw</option>
            </Selector>
        </WaveformSelectorWrapper>
    );
}
