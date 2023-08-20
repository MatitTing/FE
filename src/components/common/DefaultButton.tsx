import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';
import { Color, ColorToken } from 'styles/Color';
import { Typography } from 'styles/Typography';

type ButtonType = 'default' | 'primary' | 'secondary' | 'danger' | 'cancel';

interface ButtonProps {
  buttonType?: ButtonType;
  filled?: boolean;
  text: string | React.ReactNode;
}

const ButtonContainer = styled.button<{ buttonType: string; filled: boolean }>`
  padding: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  ${Typography.Button.Button2Bold};

  :disabled {
    cursor: not-allowed;
  }
  ${(props) =>
    props.buttonType === 'primary'
      ? props.filled
        ? FilledPrimaryButtonStyle
        : LinedPrimaryButtonStyle
      : props.buttonType === 'secondary'
      ? SecondaryButtonStyle
      : props.buttonType === 'default'
      ? DefaultButtonStyle
      : props.buttonType === 'cancel'
      ? CancelButtonStyle
      : props.filled
      ? FilledDangerButtonStyle
      : LinedDangerButtonStyle}
`;

/**
 * Button Styles Each 'buttonType', 'filled'(추후, 확장성 고려한 설계)
 */

const DefaultButtonStyle = css`
  color: ${ColorToken.white};
  background: ${Color.Blue};
  :disabled {
    background-color: ${Color.Grey};
  }
`;

const FilledPrimaryButtonStyle = css`
  color: ${ColorToken.white};
  background: ${ColorToken.primary};
  :hover {
    background: ${ColorToken.primary_pressed};
  }
  :active {
    background: ${ColorToken.primary_pressed};
  }
  :disabled {
    color: ${ColorToken.disabled_text};
    background: ${ColorToken.disabled};
  }
`;

const LinedPrimaryButtonStyle = css`
  background: ${ColorToken.white};
  color: ${ColorToken.primary};
  border: solid 1px ${ColorToken.primary};
  :hover {
    color: ${ColorToken.primary_pressed};
    border: solid 1px ${ColorToken.primary_pressed};
  }
  :active {
    color: ${ColorToken.primary_pressed};
    border: solid 1px ${ColorToken.primary_pressed};
  }
  :disabled {
    color: ${ColorToken.icon_blue};
    border: solid 1px ${ColorToken.icon_blue};
  }
`;

const SecondaryButtonStyle = css`
  background: ${ColorToken.secondary};
  color: ${ColorToken.primary};
  :hover {
    color: ${ColorToken.primary_pressed};
  }
  :active {
    background: ${ColorToken.secondary_pressed};
    color: ${ColorToken.primary};
  }
  :disabled {
    background: ${ColorToken.secondary};
    color: ${ColorToken.icon_blue};
  }
`;

const CancelButtonStyle = css`
  background: ${ColorToken.cancel};
  color: ${ColorToken.cancel_pressed};
  :hover {
    background: ${ColorToken.cancel};
    color: ${ColorToken.grey2};
  }
  :active {
    background: ${ColorToken.cancel_pressed};
    color: ${ColorToken.cancel};
  }
  :disabled {
    background: ${ColorToken.cancel};
    color: ${ColorToken.grey};
  }
`;

const FilledDangerButtonStyle = css`
  background: ${ColorToken.danger_pink};
  color: ${ColorToken.danger};
  :hover {
    color: ${ColorToken.danger_red};
  }
  :active {
    background: ${ColorToken.danger_deeppink};
    color: ${ColorToken.danger_pressed};
  }
  :disabled {
    color: ${ColorToken.danger_deeppink};
  }
`;

const LinedDangerButtonStyle = css`
  background: ${ColorToken.white};
  color: ${ColorToken.danger};
  border: solid 1px ${ColorToken.danger};
  :hover {
    color: ${ColorToken.danger_red};
    border: solid 1px ${ColorToken.danger_red};
  }
  :active {
    color: ${ColorToken.danger_pressed};
    border: solid 1px ${ColorToken.danger_pressed};
  }
  :disabled {
    color: ${ColorToken.danger_deeppink};
    border: solid 1px ${ColorToken.danger_deeppink};
  }
`;

export const DefaultButton = ({
  buttonType = 'primary',
  filled = true,
  text,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) => (
  <ButtonContainer buttonType={buttonType} filled={filled} {...props}>
    {text}
  </ButtonContainer>
);
