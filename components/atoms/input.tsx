import type { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input className="form-control" {...props}/>
    </>
  )
}
