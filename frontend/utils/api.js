export const getUserName = async (walletAddress) => {
    try {
        const response = await fetch(`http://localhost:5000/api/user?walletAddress=${encodeURIComponent(walletAddress)}`);
        const data = await response.json();

        if (data.success) {
            return data.user.username;
        } else {
            console.error('Failed to fetch user:', data.message);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};
