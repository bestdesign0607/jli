import { useParams, Link } from "react-router-dom";

const services = [
  {
    id: "consulting",
    title: "Consulting",
    details:
      "Our consulting service provides expert business guidance, operational strategies, and actionable insights to help organizations grow sustainably.",
  },
  {
    id: "technology",
    title: "Technology Solutions",
    details:
      "We design and deploy modern technology solutions including web systems, automation, and digital infrastructure tailored to your business needs.",
  },
  {
    id: "strategy",
    title: "Strategy Development",
    details:
      "Our strategy development service helps businesses define clear goals, execution plans, and competitive positioning.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    details:
      "We help brands grow through SEO, paid ads, social media marketing, and conversion-focused campaigns.",
  },
  {
    id: "training",
    title: "Training & Workshops",
    details:
      "Our hands-on training and workshops empower teams with practical, modern skills for business success.",
  },
  {
    id: "research",
    title: "Research & Insights",
    details:
      "We provide in-depth market research, feasibility studies, and business intelligence to guide decisions.",
  },
];

export default function Solutions() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Solution not found</h2>
        <Link to="/" className="text-blue-600 underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">{service.title}</h1>

      <p className="text-gray-700 leading-relaxed text-lg">
        {service.details}
      </p>
    </div>
  );
}
