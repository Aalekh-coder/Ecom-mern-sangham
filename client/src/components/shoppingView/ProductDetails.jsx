import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice'
import toast from 'react-hot-toast'
import { setProductDetails } from '@/store/shop/ProductSlice'
import { Label } from '../ui/label'
import StarRating from '../common/StarRating'
import { addNewReview, getReviews } from '@/store/shop/reviewSlice'

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.shopCart);
    const { reviews } = useSelector(state => state.shopReview);
    const [reviewMsg, setReviewMsg] = useState("");
    const [rating, setRating] = useState(0);


    function handleRatingChange(getRating) {
        setRating(getRating)
    }

    function handleAddtoCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indeOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId);
            if (indeOfCurrentItem > -1) {
                const getQuantity = getCartItems[indeOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast.error(`Only ${getQuantity} quantity can be added for this item`);
                    return
                }
            }

        }

        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast.success("Product is add to cart")
            }

        })
    }

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("")
    }

    function handleAddReview() {
        dispatch(addNewReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewValue: rating,
            reviewMessage: reviewMsg
        })).then((data) => {
            if (data?.payload?.success) {
                toast.success("Review added successfully");
                setRating(0);
                setReviewMsg("")
            }
        })
    }

    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails._id))
    }, [productDetails]);


    const averageReview = reviews && reviews.length > 0 ?
        reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length : 0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className='aspect-square w-full object-cover' />
                </div>

                <div className=''>
                    <div>
                        <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
                        <p className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>${productDetails?.price}</p>

                        {
                            productDetails?.salePrice > 0 ? <p className='text-2xl font-bold text-muted-foreground'>${productDetails?.salePrice}</p> : null}
                    </div>

                    <div className='flex items-center gap-2 mt-2'> <div className='flex items-center gap-0.5'>
                        <StarRating rating={averageReview} />

                    </div>
                        <span className="text-muted-foreground">{averageReview.toFixed(2)}</span>
                    </div>

                    <div className='mt-5'>
                        {
                            productDetails?.totalStock === 0 ? <Button className="w-full mb-5 opacity-60 cursor-not-allowed">Out of Stock</Button> : <Button className="w-full mb-5" onClick={() => handleAddtoCart(productDetails?._id, productDetails?.totalStock)}>Add to Cart</Button>
                        }

                        <Separator />

                        <div className="max-h-[300px] overflow-auto">
                            <h2 className='text-xl font-bold mb-4'>Reviews</h2>

                            <div className='grid gap-6'>
                                {
                                    reviews && reviews.length > 0 ? reviews?.map((reviewItem) => {
                                        return <div className='flex gap-4'>
                                            <Avatar className="w-10 h-10 border">
                                                <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>

                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className='font-bold'>{reviewItem?.userName}</h3>
                                                </div>
                                                <div className='flex items-center gap-0.5'>
                                                    <StarRating rating={reviewItem?.reviewValue} />
                                                </div>
                                                <p className='text-muted-foreground'>{reviewItem?.reviewMessage}</p>
                                            </div>
                                        </div>
                                    }) : <h1>No Reviews</h1>
                                }



                            </div>

                            <div className="mt-10 flex-col flex gap-2">
                                <Label>Write a review</Label>
                                <div className="flex gap-1">
                                    <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                                </div>
                                <Input placeholder="Write a reviews..." name="reviewMsg" value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} />
                                <Button disabled={reviewMsg.trim() === ""} onClick={handleAddReview}>Submit</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog