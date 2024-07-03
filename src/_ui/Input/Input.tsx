/** @jsxImportSource @emotion/react */
import React, {
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
  useId,
} from "react";
import { Column } from "../flex/view/Column";
import { Txt } from "../typography/Txt";
import { TextField } from "./TextField";
import { Textarea } from "./Textarea";
import { PhoneNumberField } from "./PhoneNumberField";
import { NumbericField } from "./NumbericField";
import { Label } from "./themes";
import { SearchField } from "./SearchField";
import Dummy from "./Dummy";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  label?: ReactNode;
  labelSize?: number | string;
  maxWidth?: number;
  important?: any;
}

export function Input({ label, labelSize, maxWidth, ...props }: InputProps) {
  const child = Children.only(props.children);
  const error: boolean = child.props.error ?? false;
  const errorMsg: string = child.props.errorMessage ?? undefined;
  const tolTip: string = child.props.tolTip ?? undefined;
  const themes = child.props.themes ?? {};
  const sizes: { tolTipSize: number; errorMsgSize: number } =
    child.props.sizes ?? {};

  const id = child.props.id ?? useId();

  return (
    <Column align="start" maxWidth={maxWidth} {...props}>
      {label && (
        <Label
          htmlFor={id}
          labelSize={labelSize as any}
          error={error}
          themes={themes}
          important={props?.important ?? false}
        >
          {label}
        </Label>
      )}

      {cloneElement(child, {
        id,
        ...child.props,
      })}

      {error && (
        <Txt
          color={themes?.error?.errorMsgColor ?? "#FF6767"}
          size={sizes?.errorMsgSize ?? 13}
          margin={{ top: 6 }}
        >
          {errorMsg}
        </Txt>
      )}

      {!!tolTip && !error && (
        <Txt
          color={themes?.default?.tolTipColor ?? "#939EAB"}
          size={sizes?.tolTipSize ?? 13}
          margin={{ top: 6 }}
        >
          {tolTip}
        </Txt>
      )}
    </Column>
  );
}

Input.TextField = TextField;
Input.Textarea = Textarea;
Input.PhoneNumberField = PhoneNumberField;
Input.NumbericField = NumbericField;
Input.SearchField = SearchField;
Input.Dummy = Dummy;
