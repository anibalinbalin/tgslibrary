import { Link } from "react-router-dom";
import imgLogo from "../assets/logo.png";

export default function NotFound() {
  return (
    <div className="min-h-dvh w-full bg-white flex flex-col items-center justify-center px-8">
      {/* Logo */}
      <Link to="/" className="absolute top-8 left-8 md:left-16">
        <img
          src={imgLogo}
          alt="Michelle Liu Logo"
          className="size-[44px] object-contain transition-opacity duration-200 hover:opacity-80"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="font-['SF_Pro:Regular',sans-serif] text-[80px] md:text-[120px] leading-none text-gray-200">
          404
        </p>
        <div className="flex flex-col gap-2">
          <p className="font-['Figtree',sans-serif] text-xl md:text-2xl text-gray-800">
            oh no! there seems to be nothing here.
          </p>
          <Link
            to="/"
            className="font-['Figtree',sans-serif] text-lg text-blue-500 hover:text-blue-400 transition-colors duration-200"
          >
            return home
          </Link>
        </div>
      </div>
    </div>
  );
}
