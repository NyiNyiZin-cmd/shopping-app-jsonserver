import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity, 
  totalPrice 
}) => {
  const handleCheckout = () => {
    alert(`စုစုပေါင်း ${totalPrice.toLocaleString()} ကျပ် ဖြင့် မှာယူလိုက်ပါပြီ!`);
    // ဒီနေရာမှာ actual checkout logic ထည့်နိုင်ပါတယ်
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-4 0v4.01" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Cart ထဲမှာ ပစ္စည်း မရှိသေးပါ
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  ပစ္စည်းများ ထည့်ပြီး မှာယူပါ
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.price.toLocaleString()} ကျပ်
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">
                  စုစုပေါင်း:
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {totalPrice.toLocaleString()} ကျပ်
                </span>
              </div>

              {/* Shipping Info */}
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                <p className="font-medium text-blue-800">🚚 ပို့ဆောင်ခ အချက်အလက်</p>
                <p>50,000 ကျပ် နှင့် အထက် - အခမဲ့</p>
                <p>50,000 ကျပ် အောက် - 3,000 ကျပ်</p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                မှာယူမည် ({totalPrice.toLocaleString()} ကျပ်)
              </button>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                ဆက်လက် ဝယ်ယူမည်
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;