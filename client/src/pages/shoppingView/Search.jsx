import ProductDetailsDialog from '@/components/shoppingView/ProductDetails';
import ShoppingProductTile from '@/components/shoppingView/ProductTile';
import { Input } from '@/components/ui/input'
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice';
import { fetchProductDetails } from '@/store/shop/ProductSlice';
import { getSearchResults, resetSearchResults } from '@/store/shop/searchSlice';
import React, { useState } from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const { cartItems } = useSelector(state => state.shopCart);
    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { searchResults } = useSelector(state => state.shopSearch);
    const { user } = useSelector(state => state.auth);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const {productDetails} = useSelector(state =>state.shopProducts);

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

     function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
      }
    

    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    }, [keyword]);

      useEffect(() => {
        if (productDetails !== null) setOpenDetailDialog(true)
      }, [productDetails])


    return (
        <div className='container mx-auto md:px-6 px-4 py-8'>
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input className="py-6" value={keyword} name="keyword" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Product..." />
                </div>
            </div>
            {
                !searchResults.length ? <h1 className='text-5xl font-extrabold mx-auto w-full'>No result found 😒</h1> : null
            }
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    searchResults?.map(item => <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart} product={item} />)
                }
            </div>
            <ProductDetailsDialog open={openDetailDialog} setOpen={setOpenDetailDialog} productDetails={productDetails} />
        </div>
    )
}

export default Search