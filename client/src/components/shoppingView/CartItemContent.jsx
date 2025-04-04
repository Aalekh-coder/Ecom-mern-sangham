import { Minus, Plus, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartQuantity } from '@/store/shop/cartSlice'
import toast from 'react-hot-toast'

const UserCartItemsContent = ({ cartItems }) => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(updateCartQuantity({
      userId: user?.id, productId: getCartItem?.productId, quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
    })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item is updated successfully")
      }
    })
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }));
    toast.success("Product Delete from the Cart")
  }

  return (
    <div className='flex items-center space-x-4'>
      <img src={cartItems?.image} alt={cartItems?.title} className='w-20 h-20 rounded object-cover' />
      <div className='flex-1'>
        <h3 className='font-extrabold'>{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button disabled={cartItems?.quantity === 1} onClick={() => handleUpdateQuantity(cartItems, "minus")} variant="outline" className="h-8 w-8 rounded-full" size="icon">
            <Minus />
            <span className='sr-only'>Decrease</span>
          </Button>
          <span className='font-semibold'>{cartItems?.quantity}</span>
          <Button onClick={() => handleUpdateQuantity(cartItems, "plus")} variant="outline" className="h-8 w-8 rounded-full" size="icon">
            <Plus />
            <span className='sr-only'>Increment</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ${(
            (cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) *
            cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash onClick={() => handleCartItemDelete(cartItems)} className='cursor-pointer mt-1' size={20} />
      </div>
    </div>
  )
}

export default UserCartItemsContent