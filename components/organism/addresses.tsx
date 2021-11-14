import { ChangeEvent } from 'react';

import Paper from '@/components/atoms/paper';
import AddressCard from '@/components/moleculs/address';

import { Address } from 'interfaces/object';

type ListAddressProps = {
  items: Address[],
  onChange: (e: ChangeEvent<HTMLInputElement>, item: Address) => void
}

export default function ListAddress({items, ...props}: ListAddressProps) {
  return (
    <div className="address-list flex-container">
      {items.map(item => (
        <div key={item.id} className="input-checkbox flex-item">
          <input type="radio" name="address[]" id={`${item.id}`} onChange={(e) => props.onChange(e, item)}/>
          <label htmlFor={`${item.id}`} className="input-label">
            <Paper>
              <AddressCard item={item} />
            </Paper>
          </label>
        </div>
      ))}
    </div>
  )
}
