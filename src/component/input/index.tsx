import { ChangeEventHandler, FocusEventHandler } from 'react'

type InputPorps = {
  id?: string
  placeholder?: string
  className?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  type?: string
  defaultValue?: string
  disabled?: boolean
  maxLength?: number
}

export const Input = ({
  className,
  value,
  onChange,
  type = 'text',
  placeholder,
  id,
  defaultValue,
  disabled,
  maxLength,
}: InputPorps): JSX.Element => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      type={type}
      defaultValue={defaultValue}
      disabled={disabled}
      maxLength={maxLength}
    />
  )
}
