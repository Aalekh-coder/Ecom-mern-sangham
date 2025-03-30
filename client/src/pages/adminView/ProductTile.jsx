import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const AdminProductTile = ({product}) => {
  return (
      <Card className="w-full max-w-sm mx-auto">
          <div>
              <div className="relative">
                  <img src={product?.image} alt={product?.title} className="w-full h-[300] object-cover rounded-t-lg" />
            </div>
          </div>

          <CardContent>
              <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
              <div className="flex justify-between items-center mb-2">
                  <span className={`${product?.saleprice > 0 ? "line-through" : ""}`}>$ {product?.price}</span>
                  {
                      product?.salePrice > 0 ? <span className="text-lg font-bold">$ {product?.saleprice}</span> : null
                  }
                  
              </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
              <Button>Edit</Button>
              <Button>Delete</Button>
          </CardFooter>
    </Card>
  )
}

export default AdminProductTile