/** @jsxImportSource @emotion/react */
import React, {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TxtSpan } from '../typography/TxtSpan';
import { InputBox, InputEdgeColorTheme, InputTheme } from './themes';
import { useUid } from '@/libs/hooks';

type SizeProps = {
  width?: string | number | '100%' | '50%';
  height?: string | number | '100%';
  borderRadius?: string | number;
  padding?: string | number;
  txtSize?: number | string;
  edgeSize?: number;
  tolTipSize?: number;
  errorMsgSize?: number;
};

type ThemeProps = {
  backgroundColor?: string;
  borderColor?: string;
  txtColor?: string;
  edgeColor?: string;
  placeholderColor?: string;
};

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
  as?: 's' | 'm' | 'l';
  theme?: 'light' | 'dark';
  width?: number | string;
  error?: boolean;
  edge?: ReactNode;
  inputSize?: number;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  sizes?: SizeProps | undefined;
  themes?: {
    default?: (ThemeProps & { tolTipColor?: string }) | undefined;
    error?: (ThemeProps & { errorMsgColor?: string }) | undefined;
    disabled?: ThemeProps | undefined;
    focus?: ThemeProps | undefined;
  };
}

const NumbericField = forwardRef(
  (
    {
      theme = 'light',
      as = 'l',
      width = '100%',
      error,
      edge,
      disabled,
      value,
      onChange,
      sizes,
      themes,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = props?.id ?? useUid();

    const [displayValue, setDisplayValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);

    const systems = { themes, focus: isFocused, error, disabled, sizes };

    useEffect(() => {
      let formattedValue = '0';
      if (typeof value === 'number') formattedValue = value.toLocaleString();
      else if (value === '') formattedValue = '';
      else if (/^\d*\.?\d*$/.test(value.toString())) {
        formattedValue = parseFloat(value.toString()).toLocaleString();
        setDisplayValue(formattedValue);
      }
    }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, '');

      if (rawValue === '') {
        setDisplayValue('');
        onChange?.({ ...e, target: { ...e.target, value: '' } });
      } else if (/^\d*\.?\d*$/.test(rawValue)) {
        setDisplayValue(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        onChange?.({ ...e, target: { ...e.target, value: rawValue } });
      } else {
        setDisplayValue('');
        onChange?.({ ...e, target: { ...e.target, value: '0' } });
      }
    };

    return (
      <InputBox
        themes={themes as any}
        sizes={sizes}
        focus={isFocused}
        error={error}
        disabled={disabled}
      >
        <input
          ref={ref}
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={displayValue}
          onChange={handleInputChange}
          disabled={disabled}
          autoComplete='off'
          {...props}
          css={InputTheme(systems as any)}
        />

        {!!edge && (
          <TxtSpan
            padding={{ right: 10 }}
            color={InputEdgeColorTheme(systems as any)}
            size={sizes?.edgeSize ?? 13}
          >
            {edge}
          </TxtSpan>
        )}
      </InputBox>
    );
  },
);

export { NumbericField };
