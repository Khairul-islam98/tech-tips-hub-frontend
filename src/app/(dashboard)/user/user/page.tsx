
import { FaCalendarAlt, FaCar, FaDollarSign } from 'react-icons/fa'; // Importing icons
import StatCard from './statecard';
 // Example API call (adjust this according to your setup)

const User = () => {
    

   

    return (
        <div className="container mx-auto p-6">
            <header className="mb-6">
                <p className="text-3xl font-bold">Admin Dashboard</p>
            </header>
            <main>
                <section className="mb-6">
                    <h1 className="text-2xl font-semibold">Welcome <span className="animate-waving-hand">👋</span></h1>
                    <p className="text-gray-700">Start the day with managing new appointments</p>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard 
                        type="totalBookings"
                        count={30}
                        label="Total Bookings"
                        icon={<FaCalendarAlt />}
                    />
                    <StatCard 
                        type="totalAvailableCars"
                        count={60}
                        label="Total Available Cars"
                        icon={<FaCar />}
                    />
                    <StatCard 
                        type="totalRevenue"
                        count={70}
                        label="Total Revenue"
                        icon={<FaDollarSign />}
                    />
                </section>
            </main>
        </div>
    );
};

export default User;
