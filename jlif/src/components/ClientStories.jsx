import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function ClientStories() {
  const testimonials = [
    {
      name: "Michael Okonkwo",
      role: "CEO, Tech Innovations Ltd",
      quote:
        "The recabites hub transformed our business infrastructure completely.",
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Sarah Johnson",
      role: "Director, Global Solutions",
      quote: "Their training programs are world-class and practical.",
      image: "https://i.pravatar.cc/100?img=47",
    },
    {
      name: "David Adebayo",
      role: "Founder, Digital Enterprises",
      quote: "Exceptional service and professional support.",
      image: "https://i.pravatar.cc/100?img=33",
    },
    {
      name: "Grace Thompson",
      role: "COO, Future Path Ltd",
      quote: "Their expertise helped us scale efficiently and confidently.",
      image: "https://i.pravatar.cc/100?img=22",
    },
    {
      name: "Emmanuel White",
      role: "IT Director, NovaTech",
      quote: "Outstanding guidance, consistent delivery, and professionalism.",
      image: "https://i.pravatar.cc/100?img=5",
    },
    {
      name: "Isabella Cruz",
      role: "Marketing Manager, Bright Edge",
      quote: "Absolutely love their professionalism and innovative mindset.",
      image: "https://i.pravatar.cc/100?img=58",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Show next set every 40 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 3 >= testimonials.length ? 0 : prev + 3
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Get visible testimonials (3 at a time)
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + 3
  );

  // Handle wrapping (if near the end of the array)
  const displayedTestimonials =
    visibleTestimonials.length < 3
      ? [
          ...visibleTestimonials,
          ...testimonials.slice(0, 3 - visibleTestimonials.length),
        ]
      : visibleTestimonials;

  return (
    <section className="bg-[#003366] text-white py-20 px-6 md:px-12 overflow-hidden mt-2">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Client Stories</h2>
        <p className="text-gray-200 mb-12">
          Real results from our valued clients
        </p>

        {/* Cards grid */}
        <div className="grid gap-8 md:grid-cols-3 transition-all duration-[1500ms] ease-in-out">
          {displayedTestimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-2xl p-8 shadow-lg text-left border border-[#FF0000]/30 hover:scale-105 transform transition-transform duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-[#FF0000]">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={18} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-100 italic mb-6 leading-relaxed">
                "{t.quote}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-3 mt-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full border-2 border-[#FF0000] object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-gray-300 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`h-3 w-3 rounded-full transition-all ${
                  currentIndex / 3 === index
                    ? "bg-[#FF0000] scale-110"
                    : "bg-gray-400"
                }`}
              ></button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
