/** @jsxImportSource @emotion/react */
import React, {
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ScrollType } from '../_themes/scroll';
import { TxtTab } from '../tab/TxtTab';
import { TxtSpan } from '../typography/TxtSpan';
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

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, ScrollType {
  autoRaise?: boolean;
  error?: boolean;
  errorMessage?: boolean | string;
  tolTip?: string;
  textCountActive?: boolean;
  tab?: TabProps;
  sizes?: SizeProps | undefined;
  themes?: {
    default?: (ThemeProps & { tolTipColor?: string }) | undefined;
    error?: (ThemeProps & { errorMsgColor?: string }) | undefined;
    disabled?: ThemeProps | undefined;
    focus?: ThemeProps | undefined;
  };
}

const Textarea = forwardRef((props: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const {
    tab,
    rows = 1,
    textCountActive,
    error,
    sizes,
    themes,
    value,
    disabled,
    autoRaise,
    scroll,
    ...rest
  } = props;
  const id = props?.id ?? useUid();

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);
  const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);

  const systems = { themes, focus: isFocused, error, disabled };

  //
  // rasize
  useEffect(() => {
    const handleRasie = () => {
      if (value && value !== '' && ref && 'current' in ref && ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
      } else if (ref && 'current' in ref && ref.current) {
        ref.current.style.height = 'auto';
      }
    };

    if (autoRaise) handleRasie();
  }, [value, ref, autoRaise]);

  return (
    <V.Column gap={6}>
      <InputBox
        themes={themes as any}
        sizes={{ ...sizes, height: 'auto' }}
        focus={isFocused}
        error={error}
        disabled={disabled}
        align='end'
      >
        <V.Row padding={{ all: 8 }}>
          <textarea
            ref={ref}
            id={id}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            rows={rows}
            disabled={disabled}
            css={{
              ...InputTheme({
                ...(systems as any),
                sizes: { ...sizes, padding: sizes?.padding ?? 5 },
              }),
              overflow: rows >= 2 ? 'auto' : 'visible',
              '::-webkit-scrollbar': {
                display: scroll?.bar ?? rows >= 2 ? 'flex' : 'none' ?? 'none',
                width: '4px',
                height: '4px',
              },
              '::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: '#cccccc',
                borderRadius: '100px',
              },
              '::-webkit-scrollbar-thumb:hover': { background: '#e2e2e2' },
              '::-webkit-scrollbar-button:start:decrement, ::-webkit-scrollbar-button:end:increment':
                {
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                },
            }}
            {...rest}
          />
        </V.Row>
        {!!tab && (
          <TxtTab
            color={tab.color ?? '#4788f4'}
            size={tab.size ?? 14}
            onClick={() => tab.onClick && tab.onClick()}
            padding={{ vertical: 10, right: 10, left: 6 }}
            css={{ whiteSpace: 'nowrap', minHeight: 48 }}
            disabled={tab.disabled}
            onMouseEnter={!tab.disabled ? (handleFocus as any) : null}
            onMouseLeave={!tab.disabled ? (handleBlur as any) : null}
          >
            {tab.name ?? '확인'}
          </TxtTab>
        )}
      </InputBox>

      {textCountActive && (
        <TxtSpan color={InputEdgeColorTheme(systems as any)} size={(sizes?.edgeSize as any) ?? 12}>
          {typeof props.value === 'string' ? props.value.length : 0}
          {'/' + props.maxLength}
        </TxtSpan>
      )}
    </V.Column>
  );
});

export { Textarea };
