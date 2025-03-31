import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const ShoppingProductTile = ({ product,handleGetProductDetails }) => {
    return (
        <Card className="w-full max-w-sm mx-auto mt-6">
            <div className='relative' onClick={()=> handleGetProductDetails(product?._id)}>
                <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
                {
                    product?.salePrice > 0 ? <Badge className="absolute top-2 left-2 bg-red-700 hover:bg-red-600">Sale</Badge> : null
                }
            </div>

            <CardContent className="p-4">
                <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm text-muted-foreground'>{product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}</span>
                    <span className='text-sm text-muted-foreground'>{product?.brand.charAt(0).toUpperCase() + product?.brand.slice(1)}</span>

                    {/* name.charAt(0).toUpperCase() + name.slice(1); */}
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>${product?.price}</span>

                    {
                        product?.salePrice > 0 ? <span className='text-sm text-muted-foreground'>${product?.salePrice}</span> : null
                    }

                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Add to cart</Button>
            </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile