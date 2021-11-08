
type CartSubtotalProps = {
  subtotal: string
  serviceFee: string
  total: string
}
export default function CartSubtotal({subtotal, serviceFee, total}: CartSubtotalProps) {
  
  return (
    <div>
      <hr className="divider"/>
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{subtotal}</p>
      </div>
      <div className="flex justify-between">
        <p>Service Fee</p>
        <p>{serviceFee}</p>
      </div>
      <hr className="divider"/>
      <div className="flex justify-between">
        <p>Total</p>
        <p>{total}</p>
      </div>
    </div>
  )
}
