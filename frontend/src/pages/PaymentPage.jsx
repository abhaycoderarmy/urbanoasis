// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Environment variables for Vite
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_3FQ3mHL3Kwc9xa";

// const PaymentPage = () => {
//     const navigate = useNavigate();
//     const { bookingId } = useParams();
    
//     const [bookingDetails, setBookingDetails] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBookingDetails = async () => {
//             try {
//                 const response = await axios.get(`${API_URL}/api/bookings/${bookingId}`);
//                 setBookingDetails(response.data);
//                 setIsLoading(false);
//             } catch (error) {
//                 setError('Error fetching booking details');
//                 toast.error("Failed to fetch booking details. Please try again.");
//                 setIsLoading(false);
//             }
//         };

//         fetchBookingDetails();
//     }, [bookingId]);

//     const handlePaymentSuccess = async (response) => {
//         try {
//             // Get payment details from Razorpay API response
//             console.log('Payment Response:', response);
            
//             // Map Razorpay method codes to readable names
//             const methodMapping = {
//                 'card': 'card',
//                 'netbanking': 'netbanking',
//                 'wallet': 'wallet',
//                 'upi': 'upi',
//                 'emi': 'emi'
//             };
    
//             let paymentMethod = 'card'; // default value
//             if (response.razorpay_payment_id) {
//                 try {
//                     const paymentDetailsResponse = await axios.get(
//                         `${API_URL}/api/payments/verify-payment/${response.razorpay_payment_id}`
//                     );
//                     if (paymentDetailsResponse.data.method) {
//                         paymentMethod = methodMapping[paymentDetailsResponse.data.method] || paymentDetailsResponse.data.method;
//                     }
//                 } catch (error) {
//                     console.error('Error fetching payment details:', error);
//                     toast.error("Failed to verify payment details.");
//                 }
//             }
    
//             const paymentData = {
//                 paymentStatus: 'paid',
//                 paymentId: response.razorpay_payment_id,
//                 amount: bookingDetails.totalAmount,
//                 paymentMethod: paymentMethod
//             };
    
//             const updateResponse = await axios.put(
//                 `${API_URL}/api/bookings/${bookingId}/payment`,
//                 paymentData
//             );
    
//             if (updateResponse.data.bookingId) {
//                 toast.success('Payment successful! Confirmation details will be sent to your email and phone.');
//                 navigate(`/confirmation/${bookingId}`);
//             } else {
//                 throw new Error('Payment update failed');
//             }
//         } catch (error) {
//             console.error('Error updating payment status:', error);
//             toast.error('Payment recorded but update failed. Please contact support.');
//         }
//     };

//     const loadRazorpay = () => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.onload = () => handlePayment();
//         script.onerror = () => {
//             toast.error("Failed to load payment gateway. Please try again.");
//         };
//         document.body.appendChild(script);
//     };

//     const handlePayment = () => {
//         if (!bookingDetails) {
//             toast.error("Booking details not found. Please try again.");
//             return;
//         }

//         const options = {
//             key: RAZORPAY_KEY,
//             amount: bookingDetails.totalAmount * 100,
//             currency: "INR",
//             name: "URBAN OASIS",
//             description: "Room Booking Payment",
//             handler: handlePaymentSuccess,
//             prefill: {
//                 name: `${bookingDetails.firstName} ${bookingDetails.lastName}`,
//                 email: bookingDetails.email,
//                 contact: bookingDetails.phoneNumber
//             },
//             theme: {
//                 color: "#3399cc"
//             }
//         };

//         try {
//             const paymentObject = new window.Razorpay(options);
//             paymentObject.open();
//         } catch (error) {
//             toast.error("Failed to initialize payment. Please try again.");
//         }
//     };

//     if (isLoading) return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//         </div>
//     );

//     if (error) return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
//                 {error}
//             </div>
//         </div>
//     );

//     if (!bookingDetails) return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
//                 No booking details found
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//             <ToastContainer position="top-right" autoClose={5000} />
//             <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>
//                 <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-3">
//                     <h3 className="text-lg font-semibold text-gray-700 mb-2">Booking Summary</h3>
//                     <div className="space-y-2 text-gray-600">
//                         <p className="flex justify-between">
//                             <span className="font-medium">Guest Name:</span>
//                             <span>{bookingDetails.firstName} {bookingDetails.lastName}</span>
//                         </p>
//                         <p className="flex justify-between">
//                             <span className="font-medium">Email:</span>
//                             <span className="text-right">{bookingDetails.email}</span>
//                         </p>
//                         <p className="flex justify-between">
//                             <span className="font-medium">Phone:</span>
//                             <span>{bookingDetails.phoneNumber}</span>
//                         </p>
//                         <p className="flex justify-between">
//                             <span className="font-medium">Room Type:</span>
//                             <span>{bookingDetails.roomType}</span>
//                         </p>
//                         <p className="flex justify-between">
//                             <span className="font-medium">Check-in:</span>
//                             <span>{new Date(bookingDetails.checkInDate).toLocaleDateString()}</span>
//                         </p>
//                         <p className="flex justify-between">
//                             <span className="font-medium">Check-out:</span>
//                             <span>{new Date(bookingDetails.checkOutDate).toLocaleDateString()}</span>
//                         </p>
//                         <div className="border-t pt-2 mt-2">
//                             <p className="flex justify-between text-lg font-semibold text-gray-800">
//                                 <span>Total Amount:</span>
//                                 <span>₹{bookingDetails.totalAmount}</span>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <button
//                     onClick={loadRazorpay}
//                     className="bg-green-500 text-white w-full py-3 rounded-lg font-medium hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2"
//                 >
//                     <span>Proceed to Pay</span>
//                     <span>₹{bookingDetails.totalAmount}</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;

// PaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Calendar, CreditCard, Mail, Phone, Home, Clock, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import 'react-toastify/dist/ReactToastify.css';

// Environment variables for Vite
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_3FQ3mHL3Kwc9xa";

const PaymentPage = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();
    
    const [bookingDetails, setBookingDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/bookings/${bookingId}`);
                setBookingDetails(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching booking details');
                toast.error("Failed to fetch booking details. Please try again.");
                setIsLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const handlePaymentSuccess = async (response) => {
        try {
            // Get payment details from Razorpay API response
            console.log('Payment Response:', response);
            
            // Map Razorpay method codes to readable names
            const methodMapping = {
                'card': 'card',
                'netbanking': 'netbanking',
                'wallet': 'wallet',
                'upi': 'upi',
                'emi': 'emi'
            };
    
            let paymentMethod = 'card'; // default value
            if (response.razorpay_payment_id) {
                try {
                    const paymentDetailsResponse = await axios.get(
                        `${API_URL}/api/payments/verify-payment/${response.razorpay_payment_id}`
                    );
                    if (paymentDetailsResponse.data.method) {
                        paymentMethod = methodMapping[paymentDetailsResponse.data.method] || paymentDetailsResponse.data.method;
                    }
                } catch (error) {
                    console.error('Error fetching payment details:', error);
                    toast.error("Failed to verify payment details.");
                }
            }
    
            const paymentData = {
                paymentStatus: 'paid',
                paymentId: response.razorpay_payment_id,
                amount: bookingDetails.totalAmount,
                paymentMethod: paymentMethod
            };
    
            const updateResponse = await axios.put(
                `${API_URL}/api/bookings/${bookingId}/payment`,
                paymentData
            );
    
            if (updateResponse.data.bookingId) {
                toast.success('Payment successful! Confirmation details will be sent to your email and phone.');
                navigate(`/confirmation/${bookingId}`);
            } else {
                throw new Error('Payment update failed');
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            toast.error('Payment recorded but update failed. Please contact support.');
        }
    };

    const loadRazorpay = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => handlePayment();
        script.onerror = () => {
            toast.error("Failed to load payment gateway. Please try again.");
        };
        document.body.appendChild(script);
    };

    const handlePayment = () => {
        if (!bookingDetails) {
            toast.error("Booking details not found. Please try again.");
            return;
        }

        const options = {
            key: RAZORPAY_KEY,
            amount: bookingDetails.totalAmount * 100,
            currency: "INR",
            name: "URBAN OASIS",
            description: "Room Booking Payment",
            handler: handlePaymentSuccess,
            prefill: {
                name: `${bookingDetails.firstName} ${bookingDetails.lastName}`,
                email: bookingDetails.email,
                contact: bookingDetails.phoneNumber
            },
            theme: {
                color: "#3399cc"
            }
        };

        try {
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            toast.error("Failed to initialize payment. Please try again.");
        }
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                <p className="text-gray-600 font-medium">Loading booking details...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <Alert variant="destructive" className="max-w-md">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    );

    if (!bookingDetails) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <Alert variant="destructive" className="max-w-md">
                <AlertDescription>No booking details found</AlertDescription>
            </Alert>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            <Card className="max-w-2xl w-full shadow-xl">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Complete Your Payment
                    </CardTitle>
                    <p className="text-gray-500">Secure payment gateway powered by Razorpay</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Guest Information Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600" />
                            Guest Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-gray-700">
                                <User className="w-4 h-4 text-blue-600" />
                                <span className="font-medium">
                                    {bookingDetails.firstName} {bookingDetails.lastName}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 overflow-hidden">
                                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="truncate">{bookingDetails.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Phone className="w-4 h-4 text-blue-600" />
                                <span>{bookingDetails.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Home className="w-4 h-4 text-blue-600" />
                                <span>{bookingDetails.roomType}</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details Section */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            Booking Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Check-in</p>
                                    <p className="font-medium">
                                        {new Date(bookingDetails.checkInDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Check-out</p>
                                    <p className="font-medium">
                                        {new Date(bookingDetails.checkOutDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-semibold text-gray-800">Total Amount</span>
                            <span className="text-2xl font-bold text-blue-600">₹{bookingDetails.totalAmount}</span>
                        </div>
                        <button
                            onClick={loadRazorpay}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-medium 
                                     hover:from-blue-700 hover:to-indigo-700 transition duration-300 transform 
                                     hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <CreditCard className="w-5 h-5" />
                            <span>Pay ₹{bookingDetails.totalAmount}</span>
                        </button>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Secured by Razorpay Payment Gateway</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentPage;