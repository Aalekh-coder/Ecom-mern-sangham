import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddtoCart }) => {
    return (
        <Card className="w-full max-w-sm mx-auto mt-6">
            <div className='relative' onClick={() => handleGetProductDetails(product?._id)}>
                <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
                {
                    product?.salePrice > 0 ? <Badge className="absolute top-2 left-2 bg-red-700 hover:bg-red-600">Sale</Badge> : null
                }


                <CardContent className="p-4">
                    <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm text-muted-foreground'>{product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}</span>
                        <span className='text-sm text-muted-foreground'>{product?.brand.charAt(0).toUpperCase() + product?.brand.slice(1)}</span>

                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>${product?.price}</span>

                        
                             {product?.totalStock === 0 ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                  Out Of Stock
                                </Badge>
                              ) : product?.totalStock < 10 ? (
                                <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                                  {`Only ${product?.totalStock} items left`}
                                </Badge>
                              ) : product?.salePrice > 0 ? (
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                  Sale
                                </Badge>
                              ) : null}
                        

                    </div>
                </CardContent>
            </div>
            <CardFooter>
            {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
            </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile