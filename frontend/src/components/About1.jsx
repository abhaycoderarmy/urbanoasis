import React from 'react'
import { useNavigate } from 'react-router-dom';
import BookingPage from '../pages/BookingPage';


const About1 = () => {

    const navigate = useNavigate();

    const handleBookingClick = () => {
        navigate('/bookingpage'); // Adjust this path according to your routing setup
    };
    return (
        <div>
            <div className="relative h-screen flex items-center justify-center">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                    src="/data/video2.mp4" // Adjust path if necessary
                    autoPlay
                    loop
                    muted
                />
                <div className="text-center text-white relative z-10">
                    <h1 className="text-5xl font-bold mb-4">Experience Luxury</h1>
                    <button
                        onClick={handleBookingClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default About1
