import React from "react";
// AdminLogin Component
const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await fetch('https://esportsappbackend.onrender.com/api/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          const data = await response.json();
          // Store JWT token securely (e.g., in local storage)
          localStorage.setItem('adminToken', data.token);
          // Redirect to admin panel or display success message
        } else {
          // Handle invalid credentials
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };
  
    return (
      <div>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default AdminLogin;
  