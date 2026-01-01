// import React from "react";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-[#003366] text-gray-200 py-10 mt-10">
//       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Brand / About */}
//         <div className="flex items-center space-x-4">
//   <div className="w-12 h-12 flex-shrink-0">
//     <img
//       src="logo.png"
//       className="w-full h-full object-cover rounded-full"
//       alt="This is Recabite logo"
//     />
//   </div>

//   <p className="text-sm leading-relaxed text-gray-300">
//     Empowering people with innovative solutions. Building a better digital future together.
//   </p>
// </div>


//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             {["Home", "About Us", "Services", "Contact"].map((item) => (
//               <li key={item}>
//                 <a
//                   href="#"
//                   className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded transition-colors duration-200"
//                 >
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Social Links */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
//           <div className="flex space-x-4">
//             {[
//               { icon: <FaFacebookF size={20} />, link: "#" },
//               { icon: <FaTwitter size={20} />, link: "#" },
//               { icon: <FaInstagram size={20} />, link: "#" },
//               { icon: <FaLinkedinIn size={20} />, link: "#" },
//             ].map((social, index) => (
//               <a
//                 key={index}
//                 href={social.link}
//                 className="p-2 bg-white/10 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
//                 aria-label="Social link"
//               >
//                 {social.icon}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-300">
//         © {new Date().getFullYear()} MyCompany. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;













import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#003366] text-gray-200 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / About */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex-shrink-0">
            <img
              src="/logo.png"
              className="w-full h-full object-cover rounded-full"
              alt="This is Recabite logo"
            />
          </div>

          <p className="text-sm leading-relaxed text-gray-300">
            Empowering people with innovative solutions. Building a better digital future together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About Us", "Services", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              {
                icon: <FaFacebookF size={20} />,
                link: "https://www.facebook.com/therecabites",
                label: "Facebook",
              },
              {
                icon: <FaInstagram size={20} />,
                link: "https://www.instagram.com/therecabites/",
                label: "Instagram",
              },
              {
                icon: <FaTiktok size={20} />,
                link: "https://www.tiktok.com/@therecabites",
                label: "TikTok",
              },
              {
                icon: <FaYoutube size={20} />,
                link: "https://youtube.com/@therecabites",
                label: "YouTube",
              },
              {
                icon: <FaXTwitter size={20} />,
                link: "https://x.com/jlinaija",
                label: "X (Twitter)",
              },
              {
                icon: <FaLinkedinIn size={20} />,
                link: "#",
                label: "LinkedIn",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Recabite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
