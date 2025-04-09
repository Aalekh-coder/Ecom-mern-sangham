import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/addressSlice'
import AddressCard from './AddressCard'
import toast from 'react-hot-toast'

const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: ""
}

const Address = ({setCurrentSelectedAddress}) => {

    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { addressList } = useSelector(state => state.shopAddress);

    function handleManageAddress(e) {
        e.preventDefault()

        if (addressList.length >= 3 && currentEditedId === null) {
            toast.error("You can add max 3 addressess");
            setFormData(initialAddressFormData)
            return
        }

        currentEditedId !== null ? dispatch(editAddress({
            userId: user?.id, addressId: currentEditedId, formData
        })).then((data) => {
            if (data?.payload?.data) {
                dispatch(fetchAllAddress(user?.id));
                setCurrentEditedId(null);
                setFormData(initialAddressFormData);
                toast.success("Address successfully edited")
            }
        }) :

            dispatch(addNewAddress({
                ...formData, userId: user?.id
            })).then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddress(user?.id));
                    setFormData(initialAddressFormData)
                };
            })


    }

    function handleDeleteAddress(getCurrentAddress) {
        console.log({ userId: user?.id, addressId: getCurrentAddress})
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id));
                toast.success("address Delete successfully")
            }
        })
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes
        })
    }

    function isFormVaild() {
        return Object.keys(formData).map(key => formData[key].trim() !== "").every(item => item)
    };

    useEffect(() => {
        dispatch(fetchAllAddress(user?.id))
    }, [])


    return (
        <Card className="">
            <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 '>
                {
                    addressList && addressList.length > 0 ? addressList.map(signleAddressItem => <AddressCard key={signleAddressItem?._id}
                        addressInfo={signleAddressItem}
                        handleDeleteAddress={handleDeleteAddress}
                        handleEditAddress={handleEditAddress}
                        setCurrentSelectedAddress={setCurrentSelectedAddress}

                    />)
                        : null
                }
            </div>

            <CardHeader>
                <CardTitle>{currentEditedId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={currentEditedId !== null ? "Edit" : "Add"} onSubmit={handleManageAddress} isBtnDisabled={!isFormVaild()} />
            </CardContent>
        </Card>
    )
}

export default Address