import { Button } from "@/components/ui/button"
import bannerOne from "../../assets/banner-1.webp"
import bannerTwo from "../../assets/banner-2.webp"
import bannerThree from "../../assets/banner-3.webp"
import bannerFour from "../../assets/account.jpg"

import { BabyIcon, Binoculars, Cat, Check, CheckCheck, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Glasses,  Shirt, ShirtIcon, UmbrellaIcon, WatchIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/ProductSlice"
import ShoppingProductTile from "@/components/shoppingView/ProductTile"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice"
import ProductDetailsDialog from "@/components/shoppingView/ProductDetails"

const categories = [
  { id: "men", label: "Men", icons: ShirtIcon },
  { id: "women", label: "Women", icons: CloudLightning },
  { id: "kids", label: "Kids", icons: BabyIcon },
  { id: "accessories", label: "Accessories", icons: WatchIcon },
  { id: "footwear", label: "Footwear", icons: UmbrellaIcon },
]

const brand = [
  { id: "nike", label: "Nike", icons: Check },
  { id: "adidas", label: "Adidas", icons: CheckCheck},
  { id: "puma", label: "Puma", icons: Cat },
  { id: "levi", label: "Levi's", icons: Binoculars },
  { id: "zara", label: "Zara", icons: Shirt },
  { id: "h&m", label: "H&M", icons: Glasses },
]
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {productList,productDetails} = useSelector( state=> state.shopProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const slides = [bannerOne, bannerTwo, bannerThree, bannerFour];

  function handleNavigateToListingPage(getCurrentItem,section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]:[getCurrentItem.id]
    }
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing")
  }

    function handleGetProductDetails(getCurrentProductId) {
      dispatch(fetchProductDetails(getCurrentProductId));
  }
  
  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is added to cart");
      }
    });
  }

  useEffect(() => {
    if(productDetails !== null) setOpenDetailsDialog(true)
  },[productDetails])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)
    }, 2500);

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({filterParams:{}, sortParams:"price-lowtohigh"}))
  },[dispatch])


  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">{
        slides.map((slide, index) => <img src={slide} key={index} className={` ${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />)
      }

        <Button onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)} variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80">
          <ChevronLeftIcon className="w-4 h-4" /></Button>
        <Button onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)} variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80">
          <ChevronRightIcon className="w-4 h-4" /></Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{
            categories.map((item) => <Card onClick={()=> handleNavigateToListingPage(item,"category")} key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow ">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <item.icons className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{item.label}</span>
              </CardContent>
            </Card>)
          }</div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{
            brand.map((item) => <Card onClick={()=> handleNavigateToListingPage(item,"brand")} key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow ">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <item.icons className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{item.label}</span>
              </CardContent>
            </Card>)
          }</div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              productList && productList.length? productList.map((product)=><ShoppingProductTile handleGetProductDetails={handleGetProductDetails} product={product} handleAddtoCart={handleAddtoCart} />) : <div>Some Error while Fetching Reload the page</div>
            }
          </div>
          
        </div>
      </section>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default Home