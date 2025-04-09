import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/orderSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const PaypalReturn = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("payerID");

    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
            dispatch(capturePayment({ payerId, paymentId, orderId })).then((data) => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId");
                window.location.href = "/shop/payment-success"
                }
            })
        }
    }, [dispatch,
        paymentId,
        payerId])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing Payment... Please wait!</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaypalReturn