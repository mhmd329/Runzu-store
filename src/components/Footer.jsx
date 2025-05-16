import React from "react";
import { FaFacebook,FaTiktok, FaInstagram ,FaPhone} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-200 text-white py-6 relative bottom-0 right-0 left-0">
        <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center space-y-4 md:space-y-0">
          
          <div className="flex items-center space-x-2">
            <FaPhone size={20} className="text-green-400" />
            <a
              href="#"
              className="text-lg text-green-400 hover:text-green-500"
            >
              01125445212
            </a>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=61573585349880&mibextid=wwXIfr&rdid=uYcpzBbSN4KbyNgH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HNXAGRFqn%2F%3Fmibextid%3DwwXIfr#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://www.instagram.com/runzu_store/?igsh=ZW5mMGVmbHh3eWdo#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-600 hover:text-pink-800"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-black hover:text-gray-700"
            >
              <FaTiktok size={30} />
            </a>
          </div>

         
        </div>
      </div>
    </footer>
  )
};

export default Footer;
