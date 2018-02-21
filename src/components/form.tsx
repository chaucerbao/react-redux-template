// Dependencies
import React from 'react'

// Type definitions
interface FieldProps {
  error?: string
  label?: string
}
interface OptionProps {
  options: Array<{ label: string; value: string }>
}
export type ChangeEvent = React.FormEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

// Components
export const Input = ({
  error,
  label,
  name,
  value,
  ...props
}: FieldProps & React.HTMLProps<HTMLInputElement>) => (
  <div>
    <label htmlFor={name}>
      {label && <span>{label}</span>}
      <input {...props} id={name} name={name} value={value} type="text" />
    </label>
    {error && <span>{error}</span>}
  </div>
)

export const TextArea = ({
  error,
  label,
  name,
  value,
  ...props
}: FieldProps & React.HTMLProps<HTMLTextAreaElement>) => (
  <div>
    <label htmlFor={name}>
      {label && <span>{label}</span>}
      <textarea {...props} id={name} name={name} value={value} />
    </label>
    {error && <span>{error}</span>}
  </div>
)

export const Select = ({
  error,
  label,
  name,
  value,
  options,
  ...props
}: FieldProps & OptionProps & React.HTMLProps<HTMLSelectElement>) => (
  <div>
    <label htmlFor={name}>
      {label && <span>{label}</span>}
      <select {...props} id={name} name={name} value={value}>
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <option key={`${name}:${optionValue}`} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
    {error && <span>{error}</span>}
  </div>
)

export const Checkbox = ({
  error,
  label,
  name,
  value,
  ...props
}: FieldProps & React.HTMLProps<HTMLInputElement>) => (
  <div>
    <label htmlFor={name}>
      <input {...props} id={name} name={name} value={value} type="checkbox" />
      {label && <span>{label}</span>}
    </label>
    {error && <span>{error}</span>}
  </div>
)

export const Radio = ({
  error,
  label,
  name,
  value,
  options,
  ...props
}: FieldProps & OptionProps & React.HTMLProps<HTMLInputElement>) => (
  <div>
    {label && <span>{label}</span>}
    {options.map(({ label: optionLabel, value: optionValue }) => (
      <label key={`${name}:${optionValue}`} htmlFor={`${name}:${optionValue}`}>
        <input
          {...props}
          id={`${name}:${optionValue}`}
          name={name}
          value={optionValue}
          type="radio"
          checked={optionValue === value}
        />
        <span>{optionLabel}</span>
      </label>
    ))}
    {error && <span>{error}</span>}
  </div>
)

export function fieldValue(e: ChangeEvent) {
  const field = e.currentTarget

  if (field instanceof HTMLSelectElement && field.multiple) {
    return Array.from(field.options)
      .filter(option => option.selected)
      .map(option => option.value)
  } else if (field instanceof HTMLInputElement && field.type === 'checkbox') {
    return field.checked
  }

  return field.value
}
