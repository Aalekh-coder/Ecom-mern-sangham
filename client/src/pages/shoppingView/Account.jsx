import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import accountImage from "../../assets/account.jpg"
import Orders from "@/components/shoppingView/Orders"
import Address from "@/components/shoppingView/Address"

const ShoppingAccount = () => {
  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={accountImage} className="h-full w-full object-cover object-center"  />
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-lg">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            <TabsContent value="orders"><Orders /></TabsContent>
            <TabsContent value="address"><Address /></TabsContent>
          </Tabs>
        </div>
      </div>
      
    </div>
  )
}

export default ShoppingAccount