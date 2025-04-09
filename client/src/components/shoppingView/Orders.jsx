import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetailsView from './OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from '@/store/shop/orderSlice'
import { Badge } from '../ui/badge'

const Orders = () => {
  const dispatch = useDispatch();

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { orderList, OrderDetails } = useSelector(state => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    console.log(getId,"getId");
    dispatch(getOrderDetails(getId))
  }

  console.log(OrderDetails,"OrderDetails");

  useEffect(() => {
    if (OrderDetails !== null) setOpenDetailsDialog(true)
  }, [OrderDetails])

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id))
  }, [dispatch])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className='sr-only'>Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orderList && orderList.length > 0 ? orderList.map(orderItem => <TableRow>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge className={`"py-1 px-3" ${orderItem?.orderStatus === "confirmed" ? "bg-green-700" : "bg-yellow-500"}`}>
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog open={openDetailsDialog} onOpenChange={() => { 
                      setOpenDetailsDialog(false);
                      dispatch(resetOrderDetails())
                    } }>
                      <Button onClick={() => {
                        handleFetchOrderDetails(orderItem?._id)
                        setOpenDetailsDialog(true)
                      }}>View Deatils</Button>
                      <ShoppingOrderDetailsView orderDetails={OrderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>) : null
              }

            </TableBody>
          </Table>
        </CardContent>

      </CardHeader>
    </Card>
  )
}

export default Orders