/** @jsxImportSource @emotion/react */
import React, {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { V } from '@/_ui';
import { InputBox, InputTheme } from './themes';
import { useUid } from '@/libs/hooks';

type SizeProps = {
  width?: string | number | '100%' | '50%';
  height?: string | number | '100%';
  borderRadius?: string | number;
  padding?: string | number;
  txtSize?: number | string;
  tolTipSize?: number;
  errorMsgSize?: number;
};

type ThemeProps = {
  backgroundColor?: string;
  borderColor?: string;
  txtColor?: string;
  placeholderColor?: string;
};

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  width?: number | string;
  error?: boolean;
  tolTip?: boolean | string;
  inputSize?: number;
  sizes?: SizeProps | undefined;
  themes?: {
    default?: (ThemeProps & { tolTipColor?: string }) | undefined;
    error?: (ThemeProps & { errorMsgColor?: string }) | undefined;
    disabled?: ThemeProps | undefined;
    focus?: ThemeProps | undefined;
  };
}

const PhoneNumberField = forwardRef(
  (
    {
      error,
      disabled,
      value: externalValue,
      onChange: externalOnChange,
      tolTip,
      sizes,
      themes,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = props?.id ?? useUid();

    const [internalValue, setInternalValue] = useState<string>(String(externalValue) || '');
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);

    const systems = { themes, focus: isFocused, error, disabled, sizes };

    // 외부에서 전달된 value 값이 변경되면, 내부 state도 업데이트합니다.
    useEffect(() => {
      if (externalValue) setInternalValue(String(externalValue));
    }, [externalValue]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value.trim().replace(/[^0-9]/g, '');
      let formattedVal = inputVal;

      if (inputVal.length === 9)
        formattedVal = inputVal.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
      else if (inputVal.length === 10)
        formattedVal = inputVal.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
      else if (inputVal.length === 11)
        formattedVal = inputVal.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

      setInternalValue(formattedVal);

      const newEvent = {
        ...e,
        target: { ...e.target, value: formattedVal },
      } as ChangeEvent<HTMLInputElement>;

      if (externalOnChange) externalOnChange(newEvent);
    };

    return (
      <V.Column gap={6}>
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
            type='text'
            autoComplete='off'
            maxLength={13}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={internalValue}
            disabled={disabled}
            onChange={handleInputChange}
            {...props}
            css={InputTheme(systems as any)}
          />
        </InputBox>
      </V.Column>
    );
  },
);

export { PhoneNumberField };
