import { useState } from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { MapPin, Phone, User } from 'lucide-react';

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button
                onClick={handleOpen}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
                Proceed to Checkout
            </Button>

            <Dialog 
                open={open} 
                handler={handleOpen} 
                className="bg-white rounded-xl shadow-xl max-w-md mx-auto"
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4 mr-2 text-gray-400" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={addressInfo.name}
                                onChange={(e) => setAddressInfo({
                                    ...addressInfo,
                                    name: e.target.value
                                })}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                Delivery Address
                            </label>
                            <textarea
                                value={addressInfo.address}
                                onChange={(e) => setAddressInfo({
                                    ...addressInfo,
                                    address: e.target.value
                                })}
                                placeholder="Enter your delivery address"
                                rows="3"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors resize-none"
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                Postal Code
                            </label>
                            <input
                                type="text"
                                value={addressInfo.pincode}
                                onChange={(e) => setAddressInfo({
                                    ...addressInfo,
                                    pincode: e.target.value
                                })}
                                placeholder="Enter postal code"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={addressInfo.mobileNumber}
                                onChange={(e) => setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber: e.target.value
                                })}
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="mt-8 space-x-4 flex">
                        <button
                            onClick={handleOpen}
                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                buyNowFunction();
                                handleOpen();
                            }}
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default BuyNowModal;