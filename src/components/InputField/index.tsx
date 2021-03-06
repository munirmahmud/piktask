import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { ChangeEvent, FC, MouseEvent } from "react";
import useStyles from "./inputField.styles";

type inputProps = {
  type?: string;
  label?: string;
  name?: string;
  length?: string;
  variant?: any;
  placeholder?: string | any;
  disabled?: boolean;
  others?: object;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const InputField: FC<inputProps> = (props) => {
  const classes = useStyles();
  const {
    type,
    label,
    name,
    length,
    variant,
    placeholder,
    disabled,
    value,
    onChange,
    others,
  } = props;

  const defaultVariant = variant ? variant : "outlined";
  const fieldLength = length ? length : "fullWidth";

  return (
    <TextField
      type={type}
      label={label}
      name={name}
      placeholder={placeholder || label}
      variant={defaultVariant}
      style={{ ...others }}
      fullWidth
      className={classes.inputField}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

type ButtonProps = {
  text: string;
  disabledBtn?: boolean;
  isLoading?: boolean;
  styles?: object;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
export const CustomBtn: FC<ButtonProps> = (props) => {
  const classes = useStyles();
  const { disabledBtn, isLoading, text, onClick, styles, ...rest } = props;

  return (
    <>
      <Button
        type="submit"
        size="medium"
        variant="contained"
        fullWidth
        className={classes.authBtn}
        disableRipple
        onClick={onClick}
        style={{ ...styles }}
        disabled={isLoading || disabledBtn}
        {...rest}
      >
        {text}
      </Button>
      {isLoading && <CircularProgress size={24} />}
    </>
  );
};
