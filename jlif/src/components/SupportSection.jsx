import { motion } from "framer-motion";

const services = [
  {
    title: "CAC registration services",
    desc: "Streamlined company registration and compliance support",
    img: "/consult.jpg",
  },
  {
    title: "Business Branding Solutions",
    desc: "Professional identity development for your organization.",
    img: "/branding.jpg",
  },
  {
    title: "Mobile and fashion accessories",
    desc: "Trendy and functional products for modern lifestyles",
    img: "/accessories.jpg",
  },
  
];

export default function SupportSection() {
  return (
    <section className="bg-[#003366] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12 text-white">
        <h2 className="text-3xl md:text-4xl font-bold">Comprehensive Business Support Services</h2>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
          Our services help your business grow
        </p>
      </div>

      {/* Grid of services */}
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative h-64 rounded-2xl overflow-hidden shadow-lg group"
          >
            {/* Background Image */}
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>

            {/* Text Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl font-semibold mb-2"
              >
                {service.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-sm mb-3"
              >
                {service.desc}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-[#FF0000] text-white rounded-lg text-sm font-medium hover:bg-white hover:text-[#FF0000] transition-colors"
              >
                Read More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
