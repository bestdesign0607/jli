import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ✅ All services with expanded details and correct paths
const services = [
  {
    id: "consulting",
    title: "Consulting",
    img: "/consult.jpg", // Make sure this file exists in public/images/
    details: [
      "Our consulting service helps organizations solve complex challenges, improve performance, and drive sustainable growth.",
      "We provide strategic planning, business process analysis, and change management solutions.",
      "Our team works closely with clients to develop actionable insights and measurable results.",
      "We help identify opportunities, mitigate risks, and implement effective strategies for sustainable success."
    ],
  },
  {
    id: "technology-solutions",
    title: "Technology Solutions",
    img: "/tech.jpg",
    details: [
      "We design and implement scalable technology solutions tailored to your business needs.",
      "Our solutions include software development, cloud integration, and IT infrastructure optimization.",
      "We help businesses automate processes, improve efficiency, and reduce operational costs.",
      "We provide ongoing support and maintenance to ensure your technology solutions grow with your business."
    ],
  },
  {
    id: "strategy-development",
    title: "Strategy Development",
    img: "/strategy.jpg",
    details: [
      "We develop tailored business strategies designed for growth, adaptability, and success.",
      "Our strategic frameworks help organizations define clear goals and measurable outcomes.",
      "We provide tools to align teams, optimize resources, and execute effectively.",
      "Our approach ensures sustainable results and prepares businesses for future challenges."
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    img: "/digital.jpg",
    details: [
      "We boost brand presence and reach through data-driven digital campaigns.",
      "Our services include social media marketing, SEO, PPC, and content creation.",
      "We analyze performance metrics to optimize campaigns and maximize ROI.",
      "We help businesses engage with audiences and build long-term relationships online."
    ],
  },
  {
    id: "training-workshops",
    title: "Training & Workshops",
    img: "/workshop.jpg",
    details: [
      "We empower teams with the latest skills and knowledge to excel.",
      "Our workshops cover leadership, digital skills, business strategy, and innovation.",
      "We deliver interactive, hands-on sessions that drive learning and adoption.",
      "Our training programs are customized to meet organizational and individual needs."
    ],
  },
  {
    id: "research-insights",
    title: "Research & Insights",
    img: "/research.jpg",
    details: [
      "We provide in-depth market insights to help businesses stay ahead of the competition.",
      "Our research includes industry analysis, competitor benchmarking, and trend forecasting.",
      "We provide actionable recommendations based on data-driven insights.",
      "Our goal is to empower clients to make informed decisions and seize new opportunities."
    ],
  },
];

export default function SolutionDetails() {
  const { id } = useParams(); // matches /solutions/:id
  const service = services.find((s) => s.id === id);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* OFFSET FOR FIXED NAVBAR */}
      <div className="pt-28">
        {/* SERVICE IMAGE */}
        <div className="w-full h-[400px] bg-gray-200">
          {service ? (
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Image not found
            </div>
          )}
        </div>

        {/* SERVICE CONTENT */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-left">
          {service ? (
            <>
              <h1 className="text-4xl font-bold text-[#003366] mb-8">
                {service.title}
              </h1>

              {/* Expanded details */}
              {service.details.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-700 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </>
          ) : (
            <h2 className="text-2xl font-bold text-red-600">
              Service not found
            </h2>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
