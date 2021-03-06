import { Address } from 'interfaces/object';

type AddressCardProps = {
  item: Address
}
export default function AddressCard({item}: AddressCardProps) {
  return (
    <div className="rounded-md flex flex-col p-2">
      <p className="h4 mb-2">{item.name}</p>
      <p>{item.phone}</p>
      <p className="truncate text-sm">{item.address}</p>
      <p className="text-sm">{item.city}, {item.postal_code}</p>
    </div>
  )
}
