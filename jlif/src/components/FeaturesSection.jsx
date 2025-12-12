import { motion } from "framer-motion";

const services = [
  {
    title: "Consulting",
    desc: "Expert guidance to help you make the best decisions and create lasting business impact.",
    img: "/consult.jpg",
  },
  {
    title: "Technology Solutions",
    desc: "Modern tools and software to optimize operations and improve efficiency.",
    img: "/tech.jpg",
  },
  {
    title: "Strategy Development",
    desc: "Tailored business strategies designed for growth, adaptability, and success.",
    img: "/strategy.jpg",
  },
  {
    title: "Digital Marketing",
    desc: "Boost your brand presence and reach with data-driven digital campaigns.",
    img: "/digital.jpg",
  },
  {
    title: "Training & Workshops",
    desc: "Empowering your team with the latest skills and knowledge to excel.",
    img: "/workshop.jpg",
  },
  {
    title: "Research & Insights",
    desc: "In-depth market insights to help you stay ahead of the competition.",
    img: "/research.jpg",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#003366] py-16 px-6 md:px-12 lg:px-20 mb-2">
      <div className="max-w-6xl mx-auto text-center mb-12 text-white">
        <h2 className="text-3xl md:text-4xl font-bold">Our Core Services</h2>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
          We provide innovative and practical solutions designed to help businesses grow, adapt, 
          and thrive in a modern world.
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
