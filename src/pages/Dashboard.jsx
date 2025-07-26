import React from 'react';
import { useClerk } from '@clerk/clerk-react';

function Dashboard() {

    const { signOut } = useClerk();

     const onclickhandle = async () => {
       try {
         await signOut();
         // Handle successful sign-out, e.g., redirect to sign-in page
       } catch (error) {
         // Handle sign-out error
         console.error('Sign out error:', error);
       }
     };

    return (
        <div>
            <button onClick={onclickhandle}>
                CLICK
            </button>
        </div>
    )
}

export default Dashboard