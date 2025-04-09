import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'

const initialFormData = {
    status:""
}

const OrderDetails = () => {
    const [formData, setFormData] = useState(initialFormData);

    function handleUpdateStatus(e) {
        e.preventDefault();
        
    }

    return (
        <DialogContent className="sm:max-w-[600px]">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order ID</p>
                        <Label>12345</Label>
                    </div>
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order Date</p>
                        <Label>12/21/21</Label>
                    </div>
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order Status</p>
                        <Label>In Process</Label>
                    </div>
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order Price</p>
                        <Label>$2320</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className='font-medium'>Order Details</div>
                        <ul className='grid gap-3 '>
                            <li className='flex items-center justify-between'>
                                <span>Product One</span>
                                <span>$ 100</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className='font-medium'>Shipping Info</div>
                        <div className='grid gap-0.5 text-muted-foreground'>
                                <span>Aalekh</span>
                                <span>Address</span>
                            <span>City</span>
                            <span>Phone</span>
                            <span>notes</span>
                            
                        </div>
                    </div>
                </div>

                <div>
                    <CommonForm formControls={[
                        {
                            label: "Order status",
                            name: "status",
                            componentType: "select",
                            options: [
                                {id:"pending",label:"Pending"},
                                {id:"inProcess",label:"In Process"},
                                {id:"inShipping",label:"In Shipping"},
                                {id:"delivered",label:"Delivered"},
                            ]
                        }
                    ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    )
}

export default OrderDetails