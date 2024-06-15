import React from 'react'

interface TextInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({
  value,
  onChange,
}: TextInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  )
}

export default TextInput