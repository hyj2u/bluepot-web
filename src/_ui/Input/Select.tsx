/** @jsxImportSource @emotion/react */
import React, { ReactElement, SelectHTMLAttributes, forwardRef, useCallback, useId, useState } from 'react'
import { Option } from './Option'
import { Txt } from '../typography/Txt'
import { P, V } from '@/_ui'
import { InputBox, InputTheme, Label } from './themes'

type SizeProps = {
    width?: string | number | '100%' | '50%'
    height?: string | number | '100%'
    borderRadius?: string | number
    padding?: string | number
    txtSize?: number | string
    edgeSize?: number | string
    tolTipSize?: number
    errorMsgSize?: number
}

type ThemeProps = {
    backgroundColor?: string
    borderColor?: string
    txtColor?: string
    edgeColor?: string
    placeholderColor?: string
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    as?: 's' | 'm' | 'l'
    theme?: 'light' | 'dark'
    renderItem: (item: any, index?: number) => ReactElement
    options: any[]
    width?: number
    label?: string
    labelSize?: string
    important?: any
    error?: boolean
    errorMessage?: boolean | string
    tolTip?: string
    placeholder?: string
    sizes?: SizeProps | undefined
    selectIconColor?: string
    selectIconSize?: number
    themes?: {
        default?: (ThemeProps & { tolTipColor?: string }) | undefined
        error?: (ThemeProps & { errorMsgColor?: string }) | undefined
        disabled?: ThemeProps | undefined
        focus?: ThemeProps | undefined
    }
}

const SelectComponent = forwardRef<HTMLSelectElement, Props>((props: Props, ref) => {
    const { options, renderItem, error, errorMessage, tolTip, disabled, label, placeholder, themes, sizes, ...rest } =
        props

    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = useCallback(() => setIsFocused(true), [isFocused])
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused])

    const systems = { themes, focus: isFocused, error, disabled, sizes }

    return (
        <V.Column>
            {label && (
                <Label
                    htmlFor={props.id}
                    labelSize={props.labelSize as any}
                    error={error ?? false}
                    themes={themes}
                    important={props?.important ?? false}
                >
                    {label}
                </Label>
            )}

            <InputBox themes={themes as any} sizes={sizes} focus={isFocused} error={error} disabled={disabled}>
                <select
                    ref={ref}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    id={props.id ?? useId()}
                    {...rest}
                    css={[InputTheme(systems as any), { cursor: 'pointer' }]}
                >
                    {!props.value && !!placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options?.map((item, index) => renderItem(item, index)).flat()}
                </select>

                <P.Absolute position={{ right: 10 }}>
                    <SelectIcon size={props?.selectIconSize ?? 11} fill={props?.selectIconColor ?? '#ccc'} />
                </P.Absolute>
            </InputBox>

            {error && !!errorMessage && (
                <Txt
                    color={themes?.error?.errorMsgColor ?? '#FF6767'}
                    size={sizes?.errorMsgSize ?? 13}
                    margin={{ top: 6 }}
                >
                    {errorMessage}
                </Txt>
            )}

            {!!tolTip && !error && (
                <Txt
                    color={themes?.default?.tolTipColor ?? '#939EAB'}
                    size={sizes?.tolTipSize ?? 13}
                    margin={{ top: 6 }}
                >
                    {tolTip}
                </Txt>
            )}
        </V.Column>
    )
})

interface SelectWithOption extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLSelectElement>> {
    Option: typeof Option
}

const Select = SelectComponent as SelectWithOption
Select.Option = Option

export { Select }

const SelectIcon = ({ fill, size }: { fill: string; size: number }) => {
    return (
        <div css={{ display: 'flex', alignItems: 'center' }}>
            <svg width={size} height={size} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.53775 7.85469C5.2579 8.19052 4.7421 8.19052 4.46225 7.85469L0.956773 3.64813C0.576833 3.1922 0.901043 2.5 1.49453 2.5L8.50547 2.5C9.09896 2.5 9.42317 3.1922 9.04323 3.64813L5.53775 7.85469Z"
                    fill={fill}
                />
            </svg>
        </div>
    )
}
