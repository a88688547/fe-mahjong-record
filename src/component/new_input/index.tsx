import { ChangeEventHandler, FocusEventHandler, KeyboardEvent } from 'react'
// import { UseFormRegisterReturn } from 'react-hook-form'
import clsx from 'clsx'

type TextInputProps = {
  type?: string
  // register?: UseFormRegisterReturn
  defaultValue?: string
  placeholder: string
  id: string
  disabled?: boolean
  maxLength?: number
  onChange?: ChangeEventHandler<HTMLInputElement>
  // onBlur?: FocusEventHandler<HTMLInputElement>
  value?: string | number
  className?:string
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined
  inputmode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined
}

const Text = ({
  type = 'text',
  // register,
  defaultValue,
  placeholder,
  id,
  disabled,
  value,
  maxLength,
  onChange,
  className,
  onKeyDown,
  inputmode,
}: 
// onBlur,
TextInputProps) => {
  return (
    <>
      <label className="hidden" htmlFor={id}>{`${id} Label`}</label>
      <input
        id={id}
        className={clsx(
          'h-12 w-full px-4 flex items-center text-base text-gray-darkest placeholder-gray-normal rounded hover:shadow focus:shadow-xl',
          disabled ? ' cursor-not-allowed' : '',
          className,
        )}
        type={type}
        inputMode={inputmode}
        placeholder={placeholder}
        defaultValue={defaultValue}
        // {...register}
        disabled={disabled}
        maxLength={maxLength}
        onChange={onChange}
        // onBlur={onBlur}
        value={value}
        onKeyDown={onKeyDown}
      />
    </>
  )
}

// const TextArea = ({ register, defaultValue, placeholder, id, disabled, maxLength }: TextInputProps) => {
//   return (
//     <>
//       <label className="hidden" htmlFor={id}>{`${id} Label`}</label>
//       <textarea
//         id={id}
//         className="w-full h-full px-4 py-2 -mb-1 placeholder-gray-normal rounded hover:shadow focus:shadow-xl"
//         rows={5}
//         maxLength={maxLength}
//         placeholder={placeholder}
//         defaultValue={defaultValue}
//         {...register}
//         disabled={disabled}
//       />
//     </>
//   )
// }

export const Input = {
  Text,
  // TextArea,
}
