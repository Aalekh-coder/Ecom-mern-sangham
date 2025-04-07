import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/adminView/layout"
import AdminDashboard from "./pages/adminView/Dashboard"
import AdminProduct from "./pages/adminView/Product"
import AdminOrder from "./pages/adminView/Order"
import AdminFeatures from "./pages/adminView/Features"
import ShoppingLayout from "./components/shoppingView/layout"
import NotFound from "./pages/NotFound"
import Home from "./pages/shoppingView/Home"
import Listing from "./pages/shoppingView/Listing"
import Checkout from "./pages/shoppingView/Checkout"
import Account from "./pages/shoppingView/Account"
import CheckAuth from "./components/common/checkAuth"
import UnauthPage from "./pages/unauthPage"
import AuthLogin from "./pages/auth/login"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/authSlice"
import { Skeleton } from "./components/ui/skeleton"

const App = () => {
  const {isAuthenticated,user,isLoading} = useSelector(state=> state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <Skeleton className=""/>

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} ><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<AuthLogin/>} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="order" element={<AdminOrder />} />
          <Route path="feature" element={<AdminFeatures />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unsaft-page" element={<UnauthPage />} />

        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />

        </Route>

      </Routes>
    </div>
  )
}

export default App