import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({ addressInfo, handleEditAddress, handleDeleteAddress}) => {
  return (
      <Card>
          <CardContent className="grid gap-4 p-4">
              <Label>Address: {addressInfo?.address}</Label>
              <Label>City: {addressInfo?.city}</Label>
              <Label>Pin-Code: {addressInfo?.pincode}</Label>
              <Label>PhoneNo. :{addressInfo?.phone}</Label>
              <Label>Notes: {addressInfo?.notes}</Label>
          </CardContent>
          <CardFooter className="p-3 flex justify-between">
              <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
              <Button className="bg-red-600" onClick={()=>handleDeleteAddress(addressInfo?._id)}>Delete</Button>
          </CardFooter>
    </Card>
  )
}

export default AddressCard