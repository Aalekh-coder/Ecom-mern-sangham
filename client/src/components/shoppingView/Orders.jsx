import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'

const Orders = () => {
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
              <TableRow>
                <TableCell>1234</TableCell>
                <TableCell>12/32/32</TableCell>
                <TableCell>In process</TableCell>
                <TableCell>$1021</TableCell>
                <TableCell>
                  <Button>View Deatils</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

      </CardHeader>
    </Card>
  )
}

export default Orders