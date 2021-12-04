
type CartSubtotalProps = {
  subtotal?: string
  serviceFee?: string
  total?: string
}
export default function CartSubtotal({subtotal, serviceFee, total}: CartSubtotalProps) {
  
  return (
    <div>
      <hr className="divider"/>
      <div className="list">
        <p>Subtotal</p>
        <p>{subtotal}</p>
      </div>
      <div className="list">
        <p>Service Fee</p>
        <p>{serviceFee}</p>
      </div>
      <hr className="divider"/>
      <div className="list text-primary font-bold">
        <p className="text-xl">Total</p>
        <p className="text-xl">{total}</p>
      </div>
    </div>
  )
}
