import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center mb-3 overflow-hidden bg-[#003366]">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/hero-bg.mp4" // Replace with your actual video path
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-6 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Innovative solutions <br /> for modern businesses
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-200">
          We deliver practical and transformative services across multiple industries. Our team
          builds solutions that empower individuals and organizations to achieve their goals.
        </p>

        {/* Buttons */}
        {/* <motion.div
          className="mt-8 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a
            href="#"
            className="px-6 py-3 rounded-lg bg-[#FF0000] text-white font-medium shadow-md hover:bg-white hover:text-[#FF0000] border border-[#FF0000] transition-colors"
          >
            Explore
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-lg bg-white text-[#003366] font-medium shadow-md hover:bg-[#FF0000] hover:text-white border border-white transition-colors"
          >
            Learn more
          </a>
        </motion.div> */}
      </motion.div>
    </section>
  );
}