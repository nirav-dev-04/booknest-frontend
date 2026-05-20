function AdminAnalytics() {

    return (

        <div className="page-container admin-page">

            <h1 className="page-title">

                Analytics Dashboard

            </h1>

            <div className="analytics-grid">

                <div className="analytics-card">

                    <h2>Total Sales</h2>

                    <h1>₹25,000</h1>

                </div>

                <div className="analytics-card">

                    <h2>Total Orders</h2>

                    <h1>120</h1>

                </div>

                <div className="analytics-card">

                    <h2>Low Stock Books</h2>

                    <h1>4</h1>

                </div>

                <div className="analytics-card">

                    <h2>Most Sold Book</h2>

                    <h1>Atomic Habits</h1>

                </div>

            </div>

        </div>
    );
}

export default AdminAnalytics;