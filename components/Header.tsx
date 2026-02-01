
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392833] px-6 lg:px-40 py-4 sticky top-0 bg-background-dark/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-4 text-white">
        <div className="size-8 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Vidiomark</h2>
      </div>
      <nav className="hidden md:flex items-center gap-9">
        {['Platform', 'Solutions', 'Analytics', 'Pricing'].map((item) => (
          <a key={item} className="text-white/80 hover:text-white text-sm font-medium transition-colors" href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>
      <div className="flex gap-3">
        <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide glow-pink hover:opacity-90 transition-all hover:scale-105">
          Get Started
        </button>
        <button className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-[#392833] text-white text-sm font-bold hover:bg-[#4a3542] transition-all">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
