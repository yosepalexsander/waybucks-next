import { FocusEvent } from 'react'
import Image from 'next/image'
import useSWRImmutable from 'swr/immutable'
import Loading from '@/components/atoms/loading'

import { GetToppingsResponse } from 'interfaces/api'
import { getToppings } from 'utils/api'

type ToppingsProps = {
  onChange: (e: FocusEvent<HTMLInputElement>) => void
}

export default function Toppings(props: ToppingsProps) {
  const {data, error} = useSWRImmutable<GetToppingsResponse, Error>('toppings', getToppings)
  if (!data && !error) {
    return <Loading />
  }
  return (
    <div className="topping-list">
      {data?.payload.map(item => (
        <div key={item.id} className="input-checkbox">
          <input type="checkbox" name={item.name} id={`${item.id}`} value={item.price} onChange={props.onChange}/>
          <label htmlFor={`${item.id}`} className="input-label">
            <div>
              <Image src={item.image} alt={item.name} width={50} height={50} layout="responsive"/>
            </div>
          </label>
          <span className="topping-name">{item.name}</span>
        </div>
      ))}
    </div>
  )
}
