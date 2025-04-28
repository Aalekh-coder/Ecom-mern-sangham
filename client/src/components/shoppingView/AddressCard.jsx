import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({ addressInfo, handleEditAddress, handleDeleteAddress, setCurrentSelectedAddress, selectedId }) => {
  
  console.log(selectedId);
  return (
    <Card onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null} className={`cursor-pointer ${selectedId?._id === addressInfo?._id ? "border-blue-950 bg-gray-200":""}`}>
      <CardContent className={`grid gap-4 p-4 ${selectedId === addressInfo?._id? "border-black":""}`}>
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pin-Code: {addressInfo?.pincode}</Label>
        <Label>PhoneNo. :{addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button className="bg-red-600" onClick={() => handleDeleteAddress(addressInfo?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard