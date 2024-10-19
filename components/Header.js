// Header.js (client-side component with "use client")
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const router = useRouter();

  useEffect(() => {
    // Check if a user is logged in (using localStorage)
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true); // User is logged in
    } else {
      setIsAuthenticated(false); // User is not logged in
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear user session from localStorage
    localStorage.removeItem('currentUser');

    // Update login state and redirect to login page
    setIsAuthenticated(false);
    router.push('/'); // Assuming '/login' is your login route
  };

  const handleSignIn = () => {
    // Redirect to the login page
    router.push('/dashboard');
  };

  return (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>
        DevBorrow
      </h1>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@Oussama" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <button
              onClick={handleLogout}
              className="text-sm bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className="text-sm bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
