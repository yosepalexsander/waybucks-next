export default function CartSkeleton() {
  return (
    <div className="cart-container">
      <div className="cart-list">
        {[1,2].map(index => (
          <div key={index} className="cart-item skeleton skeleton-wave">
            <span className="cart-img"></span>
            <div className="cart-info flex-1">
              <span className="h-4/5"></span>
              <span className="h-1/2"></span>
            </div>
            <div className="cart-info">
              <span className="h-4/5 w-full"></span>
              <div className="qty h-1/2">
                <span className="h-full w-6"></span>
                <span className="h-full w-6"></span>
                <span className="h-full w-6 mx-3"></span>
                <span className="h-full w-6"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
