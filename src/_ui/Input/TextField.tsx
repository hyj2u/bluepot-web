/** @jsxImportSource @emotion/react */
import React, {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { TxtTab } from '../tab/TxtTab';
import { V } from '@/_ui';
import { InputBox, InputEdgeColorTheme, InputTheme } from './themes';
import { useUid } from '@/libs/hooks';

type TabProps = { onClick?: any; name: string; size?: number; color?: string; disabled?: boolean };

type SizeProps = {
  width?: string | number | '100%' | '50%';
  height?: string | number | '100%';
  borderRadius?: string | number;
  padding?: string | number;
  txtSize?: number | string;
  edgeSize?: number | string;
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

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
  errorMessage?: string;
  tolTip?: boolean | string;
  tab?: TabProps;
  edge?: ReactNode;
  sizes?: SizeProps | undefined;
  themes?: {
    default?: (ThemeProps & { tolTipColor?: string }) | undefined;
    error?: (ThemeProps & { errorMsgColor?: string }) | undefined;
    disabled?: ThemeProps | undefined;
    focus?: ThemeProps | undefined;
  };
}

const TextField = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const { disabled, tab, error, edge, sizes, themes, ...rest } = props;
  const id = props?.id ?? useUid();

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);
  const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);

  const systems = { themes, focus: isFocused, error, disabled, sizes };

  //
  // numberic
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === 'number') {
      let { value } = event.target;

      const newValue = value.replace(/[^0-9]/g, '');

      if (props.maxLength && newValue.length > props.maxLength) {
        event.target.value = newValue.slice(0, props.maxLength);
      } else event.target.value = newValue;
    }

    props.onChange?.(event);
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
          id={id}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          disabled={disabled}
          {...rest}
          css={InputTheme(systems as any)}
        />

        {!!tab && !edge && (
          <TxtTab
            color={tab.color ?? '#4788f4'}
            size={tab.size ?? 14}
            onMouseEnter={!tab.disabled ? (handleFocus as any) : null}
            onMouseLeave={!tab.disabled ? (handleBlur as any) : null}
            onClick={() => tab.onClick && tab.onClick()}
            padding={{ vertical: 10, right: 10, left: 6 }}
            css={{ whiteSpace: 'nowrap' }}
            disabled={tab.disabled}
          >
            {tab.name ?? '확인'}
          </TxtTab>
        )}

        {!!edge && !tab && (
          <div
            css={{
              padding: '10px 10px 10px 6px',
              fontSize: sizes?.edgeSize ?? 13,
              color: InputEdgeColorTheme(systems as any),
              whiteSpace: 'nowrap',
            }}
          >
            {edge}
          </div>
        )}
      </InputBox>
    </V.Column>
  );
});

export { TextField };
