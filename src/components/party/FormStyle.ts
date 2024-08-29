import styled from '@emotion/styled';
import { NewColor } from 'styles/Color';

export const Wrapper = styled.div`
    padding: 15px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: fit-content;
    padding-bottom: 8px;
`;

export const Title = styled.h5`
    font-weight: 400;
    padding-bottom: 10px;
    margin-top: 12px;
`;

export const OptionGroup = styled.div`
    width: 100%;
    height: fit-content;
`;

export const OtionLable = styled.label<{ isActive: boolean }>`
    display: inline-block;
    padding: 5px 10px;
    margin: 0 1%;
    text-align: center;
    border-radius: 25px;
    color: ${(props) => (props.isActive ? '#fff' : NewColor.text_secondary)};
    border: ${(props) =>
        props.isActive ? `1px solid ${NewColor.primary}` : `1px solid ${NewColor.border}`};
    background-color: ${(props) => (props.isActive ? NewColor.primary : 'transparent')};
    transition: all 0.3s;
    user-select: none;
    font-size: 12px;
`;

export const Submit = styled.button`
    display: block;
    margin: 10px auto;
    margin-top: 40px;
    width: 130px;
    aspect-ratio: 400/105;
    color: #fff;
    background-color: ${NewColor.primary};
    border-radius: 25px;
    border: 1px solid ${NewColor.primary};

    &:disabled {
        color: ${NewColor.disabled_text};
        background-color: #fff;
        border: 1px solid ${NewColor.disabled};
    }
`;
