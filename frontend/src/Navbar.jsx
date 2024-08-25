import React from 'react';
import Auth from './Auth';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#282c34', color: 'white' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
               <h2>Ventocs</h2>
            </div>
            <div>
                <Auth />
            </div>
        </nav>
    );
};

export default Navbar;
