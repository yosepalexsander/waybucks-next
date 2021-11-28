import { FocusEvent } from 'react';
import Image from 'next/image';
import useSWRImmutable from 'swr/immutable';

import { getToppings } from 'utils/api';
import { GetToppingsResponse } from 'interfaces/api';

type ToppingsProps = {
  onChange: (e: FocusEvent<HTMLInputElement>) => void
}

export default function Toppings(props: ToppingsProps) {
  const {data, error} = useSWRImmutable<GetToppingsResponse, Error>('toppings', getToppings)
  const skeleton = [1,2,3,4,5]
  const currencyFormatter = Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })

  return (
    <div className="topping-list">
      {!data && !error ? (
        <>
          {skeleton.map((index) => (
            <div key={index} className="input-checkbox skeleton skeleton-wave">
              <span className="topping-img"></span>
              <span className="topping-name"></span>
            </div>
          ))}
        </>
      ): (
        <>
          {data?.payload.map(item => (
            <div key={item.id} className="input-checkbox">
              <input type="checkbox" name={item.name} id={`${item.id}`} value={item.price} onChange={props.onChange}/>
              <label htmlFor={`${item.id}`} className="input-label">
                <div className="topping-img">
                  <Image src={item.image} alt={item.name} width={50} height={50} layout="responsive"/>
                </div>
              </label>
              <p className="topping-name">{item.name}</p>
              <p className="topping-price">{currencyFormatter.format(item.price)}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
