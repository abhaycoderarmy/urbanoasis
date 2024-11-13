// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ConfirmationPage = () => {
//     const { bookingId } = useParams();
//     const navigate = useNavigate();
//     const [bookingDetails, setBookingDetails] = useState(null);
//     const [paymentDetails, setPaymentDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 const bookingResponse = await axios.get(
//                     `http://localhost:5000/api/bookings/${bookingId}`
//                 );
//                 setBookingDetails(bookingResponse.data);
                
//                 const paymentResponse = await axios.get(
//                     `http://localhost:5000/api/bookings/payments/${bookingId}`
//                 );
//                 setPaymentDetails(paymentResponse.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching details:', error);
//                 setError(error.response?.data?.message || 'Error fetching details');
//                 setLoading(false);
//             }
//         };

//         if (bookingId) {
//             fetchDetails();
//         }
//     }, [bookingId]);

//     const handleNewBooking = () => {
//         navigate('/bookingpage');
//     };

//     const handleGoHome = () => {
//         navigate('/');
//     };

//     if (loading) return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//             <span className="ml-2">Loading...</span>
//         </div>
//     );
    
//     if (error) return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                 {error}
//             </div>
//         </div>
//     );

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             <h1 className="text-2xl font-bold mb-4 text-center">Booking Confirmation</h1>
//             {bookingDetails && (
//                 <div className="space-y-6">
//                     {/* ... existing details sections ... */}
//                     <div className="border-b pb-4">
//                         <h2 className="text-xl font-semibold mb-2">Guest Details</h2>
//                         <p><strong>Name:</strong> {bookingDetails.firstName} {bookingDetails.lastName}</p>
//                         <p><strong>Email:</strong> {bookingDetails.email}</p>
//                         <p><strong>Phone:</strong> {bookingDetails.phoneNumber}</p>
//                     </div>

//                     <div className="border-b pb-4">
//                         <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
//                         <p><strong>Room Type:</strong> {bookingDetails.roomType}</p>
//                         <p><strong>Room Number:</strong> {bookingDetails.roomNumber}</p>
//                         <p><strong>Check-in Date:</strong> {new Date(bookingDetails.checkInDate).toLocaleDateString()}</p>
//                         <p><strong>Check-out Date:</strong> {new Date(bookingDetails.checkOutDate).toLocaleDateString()}</p>
//                         <p><strong>Total Amount:</strong> ₹{bookingDetails.totalAmount}</p>
//                     </div>

//                     {paymentDetails && (
//                         <div className="border-b pb-4">
//                             <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
//                             <p><strong>Payment ID:</strong> {paymentDetails.payment_id}</p>
//                             <p><strong>Payment Date:</strong> {new Date(paymentDetails.payment_date).toLocaleDateString()}</p>
//                             <p><strong>Payment Method:</strong> {paymentDetails.payment_method}</p>
//                             <p><strong>Amount Paid:</strong> ₹{paymentDetails.amount}</p>
//                             <div className={`mt-4 p-4 rounded-md ${
//                                 paymentDetails.payment_status === 'paid' 
//                                     ? 'bg-green-100 text-green-800' 
//                                     : 'bg-yellow-100 text-yellow-800'
//                             }`}>
//                                 <p className="font-semibold">
//                                     Payment Status: {paymentDetails.payment_status}
//                                 </p>
//                             </div>
//                         </div>
//                     )}

//                     {/* Action buttons */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <button
//                             onClick={() => window.print()}
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                             Print Receipt
//                         </button>
//                         <button
//                             onClick={handleNewBooking}
//                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                         >
//                             Make Another Booking
//                         </button>
//                         <button
//                             onClick={handleGoHome}
//                             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//                         >
//                             Back to Home
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ConfirmationPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, Mail, Phone, Home, Printer, PlusCircle, Share2 } from 'lucide-react';

const ConfirmationPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showShareOptions, setShowShareOptions] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const bookingResponse = await axios.get(
                    `http://localhost:5000/api/bookings/${bookingId}`
                );
                setBookingDetails(bookingResponse.data);
                
                const paymentResponse = await axios.get(
                    `http://localhost:5000/api/bookings/payments/${bookingId}`
                );
                setPaymentDetails(paymentResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching details:', error);
                setError(error.response?.data?.message || 'Error fetching details');
                setLoading(false);
            }
        };

        if (bookingId) {
            fetchDetails();
        }
    }, [bookingId]);

    const handleNewBooking = () => {
        navigate('/bookingpage');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const handleShare = async () => {
        const bookingUrl = window.location.href;
        try {
            await navigator.clipboard.writeText(bookingUrl);
            setShowShareOptions(true);
            setTimeout(() => setShowShareOptions(false), 3000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    const calculateNights = () => {
        if (!bookingDetails) return 0;
        const checkIn = new Date(bookingDetails.checkInDate);
        const checkOut = new Date(bookingDetails.checkOutDate);
        return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <span className="ml-3 text-lg text-gray-700">Loading your confirmation...</span>
        </div>
    );
    
    if (error) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="max-w-md p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: `url('/api/placeholder/1920/1080')`,
                    opacity: '0.15'
                }}
            />
            
            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-gray-600">Thank you for choosing our hotel. Your booking details are below.</p>
                </div>

                {bookingDetails && (
                    <div className="space-y-6">
                        {/* Booking Summary */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
                            <div className="border-b border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Booking Summary</h2>
                                    <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                                        #{bookingId}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Check-in</p>
                                        <p className="font-medium">{new Date(bookingDetails.checkInDate).toLocaleDateString('en-US', { 
                                            weekday: 'short', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-medium">{calculateNights()} nights</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Guest Information */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold">Guest Information</h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-medium">
                                            {bookingDetails.firstName.charAt(0)}{bookingDetails.lastName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">{bookingDetails.firstName} {bookingDetails.lastName}</p>
                                        <p className="text-sm text-gray-500">Primary Guest</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span>{bookingDetails.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{bookingDetails.phoneNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Room Details */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold">Room Details</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold">{bookingDetails.roomType}</p>
                                        <p className="text-sm text-gray-500">Room {bookingDetails.roomNumber}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">₹{bookingDetails.totalAmount}</p>
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Status */}
                        {paymentDetails && (
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold">Payment Information</h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Payment ID</p>
                                            <p className="font-medium">{paymentDetails.payment_id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Payment Method</p>
                                            <p className="font-medium">{paymentDetails.payment_method}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Amount Paid</p>
                                            <p className="font-medium">₹{paymentDetails.amount}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                paymentDetails.payment_status === 'paid'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {paymentDetails.payment_status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <button
                                onClick={() => window.print()}
                                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors space-x-2"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print Receipt</span>
                            </button>
                            <button
                                onClick={handleNewBooking}
                                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors space-x-2"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>New Booking</span>
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors space-x-2"
                            >
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </button>
                        </div>

                        {showShareOptions && (
                            <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded">
                                Booking URL copied to clipboard!
                            </div>
                        )}

                        <button
                            onClick={handleGoHome}
                            className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors space-x-2 w-full mt-4"
                        >
                            <Home className="w-4 h-4" />
                            <span>Return to Home</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmationPage;