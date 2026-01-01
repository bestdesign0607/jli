// // import React, { useState } from "react";
// // import { useParams, useSearchParams } from "react-router-dom";
// // import axios from "axios";

// // // ================= Helper Components =================
// // const InputField = ({ label, name, placeholder, type = "text", required = false, form, handleChange }) => (
// //     <div className="flex flex-col mb-2">
// //         <label className="font-semibold mb-1">{label}</label>
// //         <input
// //             type={type}
// //             name={name}
// //             placeholder={placeholder}
// //             required={required}
// //             value={form[name]}
// //             onChange={handleChange}
// //             className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
// //         />
// //     </div>
// // );

// // const FileField = ({ label, name, form, handleChange }) => (
// //     <div className="flex flex-col mb-2">
// //         <label className="font-semibold mb-1">{label}</label>
// //         <input
// //             type="file"
// //             name={name}
// //             onChange={handleChange}
// //             className="p-2 border border-gray-300 rounded w-full"
// //         />
// //     </div>
// // );

// // const SelectField = ({ label, name, options, required = false, form, handleChange }) => (
// //     <div className="flex flex-col mb-2">
// //         <label className="font-semibold mb-1">{label}</label>
// //         <select
// //             name={name}
// //             value={form[name]}
// //             onChange={handleChange}
// //             className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
// //             required={required}
// //         >
// //             <option value="">Select {label}</option>
// //             {options.map((opt) => (
// //                 <option key={opt} value={opt}>{opt}</option>
// //             ))}
// //         </select>
// //     </div>
// // );

// // const Section = ({ title, children }) => (
// //     <div className="bg-white p-5 rounded-lg shadow space-y-3 mb-4">
// //         <h3 className="text-xl font-semibold border-b pb-1 mb-3">{title}</h3>
// //         {children}
// //     </div>
// // );
// // // ======================================================

// // export default function DigitalPostPayment() {
// //     const { id } = useParams();
// //     const [searchParams] = useSearchParams();
// //     const reference = searchParams.get("ref");
// //     const token = sessionStorage.getItem("access_token");


// //     const [submitted, setSubmitted] = useState(false);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState("");

// //     const [form, setForm] = useState({
// //         surname: "", firstname: "", othername: "", dob: "", gender: "", phone: "",
// //         home_state: "", home_lga: "", home_city: "", home_house: "", home_street: "",
// //         company_state: "", company_lga: "", company_city: "", company_house: "", company_street: "", company_email: "",
// //         business_name1: "", business_name2: "", personal_email: "",
// //         object1: "", object2: "", object3: "", object4: "",
// //         witness_surname: "", witness_firstname: "", witness_othername: "", witness_dob: "", witness_gender: "", witness_phone: "",
// //         witness_state: "", witness_lga: "", witness_city: "", witness_house: "", witness_street: "",
// //         id_card: null, signature_director: null, signature_witness: null, nin: null,
// //     });

// //     const whatsappNumber = "2347026023535";
// //     const whatsappMessage = encodeURIComponent(
// //         `Hello Support Team,

// // I have completed payment for CAC Company Registration.

// // Product ID: ${id}
// // Payment Reference: ${reference}

// // I have submitted my CAC registration details and would like to upload my proof of payment and documents.

// // Thank you.`
// //     );

// //     const handleChange = (e) => {
// //         const { name, value, files } = e.target;
// //         if (files) {
// //             setForm({ ...form, [name]: files[0] });
// //         } else {
// //             setForm({ ...form, [name]: value });
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError("");
// //         setLoading(true);

// //         try {
// //             const requirements = { ...form };
// //             const formData = new FormData();
// //             formData.append("product", id);
// //             formData.append("full_name", `${form.firstname} ${form.surname}`);
// //             formData.append("email", form.personal_email);
// //             formData.append("requirements", JSON.stringify(requirements));

// //             if (form.id_card) formData.append("id_card", form.id_card);
// //             if (form.signature_director) formData.append("signature_director", form.signature_director);
// //             if (form.signature_witness) formData.append("signature_witness", form.signature_witness);
// //             if (form.nin) formData.append("nin", form.nin);

// //             await axios.post(
// //                 `http://127.0.0.1:8000/store/digital-orders/create/`,  // <-- updated URL
// //                 formData,
// //                 {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                         "Content-Type": "multipart/form-data",
// //                     },
// //                 }
// //             );


// //             setSubmitted(true);
// //         } catch (err) {
// //             console.error(err);
// //             setError("Failed to submit information. Please try again.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     if (submitted) {
// //         return (
// //             <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center space-y-4">
// //                 <h2 className="text-2xl font-bold text-green-700">Information Submitted Successfully</h2>
// //                 <p className="text-gray-700">
// //                     Upload your proof of payment and our support team will reach out to you shortly.
// //                 </p>
// //                 <a
// //                     href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="block w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-bold mt-4"
// //                 >
// //                     Contact WhatsApp Support
// //                 </a>
// //             </div>
// //         );
// //     }

// //     return (
// //         <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mt-6 p-6 bg-gray-50 rounded-xl shadow space-y-6">
// //             <h2 className="text-3xl font-bold text-[#003366] text-center mb-6">CAC Company Registration Form</h2>
// //             {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //             {/* DIRECTOR DETAILS */}
// //             <Section title="Director Details">
// //                 <InputField label="Surname" name="surname" placeholder="e.g., Ade" form={form} handleChange={handleChange} required />
// //                 <InputField label="First Name" name="firstname" placeholder="e.g., John" form={form} handleChange={handleChange} required />
// //                 <InputField label="Other Name" name="othername" placeholder="Optional" form={form} handleChange={handleChange} />
// //                 <InputField label="Date of Birth" name="dob" type="date" form={form} handleChange={handleChange} required />
// //                 <SelectField label="Gender" name="gender" options={["Male", "Female", "Other"]} form={form} handleChange={handleChange} required />
// //                 <InputField label="Phone Number" name="phone" placeholder="e.g., 08012345678" form={form} handleChange={handleChange} required />
// //             </Section>

// //             {/* HOME ADDRESS */}
// //             <Section title="Home Address">
// //                 <InputField label="State" name="home_state" placeholder="e.g., Lagos" form={form} handleChange={handleChange} required />
// //                 <InputField label="LGA" name="home_lga" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} required />
// //                 <InputField label="City/Town/Village" name="home_city" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} required />
// //                 <InputField label="House Number" name="home_house" placeholder="e.g., 12" form={form} handleChange={handleChange} />
// //                 <InputField label="Street Name" name="home_street" placeholder="e.g., Allen Avenue" form={form} handleChange={handleChange} />
// //             </Section>

// //             {/* COMPANY ADDRESS */}
// //             <Section title="Company Address">
// //                 <InputField label="State" name="company_state" placeholder="e.g., Lagos" form={form} handleChange={handleChange} required />
// //                 <InputField label="LGA" name="company_lga" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} required />
// //                 <InputField label="City/Town/Village" name="company_city" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} required />
// //                 <InputField label="House Number" name="company_house" placeholder="e.g., 12" form={form} handleChange={handleChange} />
// //                 <InputField label="Street Name" name="company_street" placeholder="e.g., Allen Avenue" form={form} handleChange={handleChange} />
// //                 <InputField label="Company Email" name="company_email" placeholder="e.g., info@company.com" type="email" form={form} handleChange={handleChange} required />
// //             </Section>

// //             {/* BUSINESS NAMES */}
// //             <Section title="Proposed Business Names">
// //                 <InputField label="Business Name 1" name="business_name1" placeholder="e.g., Tech Solutions Ltd" form={form} handleChange={handleChange} required />
// //                 <InputField label="Business Name 2" name="business_name2" placeholder="Optional" form={form} handleChange={handleChange} />
// //                 <InputField label="Personal Email" name="personal_email" placeholder="e.g., you@example.com" type="email" form={form} handleChange={handleChange} required />
// //             </Section>

// //             {/* OBJECT OF MEMORANDUM */}
// //             <Section title="Object of Memorandum">
// //                 <p className="text-gray-500 text-sm mb-2">Example 1: SALES AND SUPPLIES OF COMPUTER HARDWARE AND SOFTWARE</p>
// //                 <p className="text-gray-500 text-sm mb-2">Example 2: REPAIR AND MAINTENANCE OF COMPUTER HARDWARE AND SOFTWARE</p>
// //                 <InputField label="Object 1" name="object1" placeholder="What your company will do" form={form} handleChange={handleChange} required />
// //                 <InputField label="Object 2" name="object2" placeholder="Optional" form={form} handleChange={handleChange} />
// //                 <InputField label="Object 3" name="object3" placeholder="Optional" form={form} handleChange={handleChange} />
// //                 <InputField label="Object 4" name="object4" placeholder="Optional" form={form} handleChange={handleChange} />
// //             </Section>

// //             {/* WITNESS DETAILS */}
// //             <Section title="Witness Details">
// //                 <InputField label="Surname" name="witness_surname" placeholder="e.g., Ade" form={form} handleChange={handleChange} required />
// //                 <InputField label="First Name" name="witness_firstname" placeholder="e.g., John" form={form} handleChange={handleChange} required />
// //                 <InputField label="Other Name" name="witness_othername" placeholder="Optional" form={form} handleChange={handleChange} />
// //                 <InputField label="Date of Birth" name="witness_dob" type="date" form={form} handleChange={handleChange} required />
// //                 <SelectField label="Gender" name="witness_gender" options={["Male", "Female", "Other"]} form={form} handleChange={handleChange} required />
// //                 <InputField label="Phone Number" name="witness_phone" placeholder="e.g., 08012345678" form={form} handleChange={handleChange} required />
// //                 <InputField label="State" name="witness_state" placeholder="e.g., Lagos" form={form} handleChange={handleChange} />
// //                 <InputField label="LGA" name="witness_lga" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} />
// //                 <InputField label="City/Town/Village" name="witness_city" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} />
// //                 <InputField label="House Number" name="witness_house" placeholder="e.g., 12" form={form} handleChange={handleChange} />
// //                 <InputField label="Street Name" name="witness_street" placeholder="e.g., Allen Avenue" form={form} handleChange={handleChange} />
// //             </Section>

// //             {/* SUPPORTING DOCUMENTS */}
// //             <Section title="Supporting Documents">
// //                 <FileField label="ID Card (snap and upload)" name="id_card" form={form} handleChange={handleChange} />
// //                 <FileField label="Director Signature" name="signature_director" form={form} handleChange={handleChange} />
// //                 <FileField label="Witness Signature" name="signature_witness" form={form} handleChange={handleChange} />
// //                 <FileField label="NIN" name="nin" form={form} handleChange={handleChange} />
// //             </Section>

// //             <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-bold mt-4"
// //             >
// //                 {loading ? "Submitting..." : "Submit CAC Information"}
// //             </button>
// //         </form>
// //     );
// // }















// import React, { useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";

// // ================= Helper Components =================
// const InputField = ({ label, name, placeholder, type = "text", required = false, form, handleChange }) => (
//     <div className="flex flex-col mb-2">
//         <label className="font-semibold mb-1">{label}</label>
//         <input
//             type={type}
//             name={name}
//             placeholder={placeholder}
//             required={required}
//             value={form[name]}
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
//         />
//     </div>
// );

// const FileField = ({ label, name, form, handleChange }) => (
//     <div className="flex flex-col mb-2">
//         <label className="font-semibold mb-1">{label}</label>
//         <input
//             type="file"
//             name={name}
//             onChange={handleChange}
//             className="p-2 border border-gray-300 rounded w-full"
//         />
//     </div>
// );

// const SelectField = ({ label, name, options, required = false, form, handleChange }) => (
//     <div className="flex flex-col mb-2">
//         <label className="font-semibold mb-1">{label}</label>
//         <select
//             name={name}
//             value={form[name]}
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
//             required={required}
//         >
//             <option value="">Select {label}</option>
//             {options.map((opt) => (
//                 <option key={opt} value={opt}>{opt}</option>
//             ))}
//         </select>
//     </div>
// );

// const Section = ({ title, children }) => (
//     <div className="bg-white p-5 rounded-lg shadow space-y-3 mb-4">
//         <h3 className="text-xl font-semibold border-b pb-1 mb-3">{title}</h3>
//         {children}
//     </div>
// );
// // ======================================================

// export default function DigitalPostPayment() {
//     const { id } = useParams();
//     const [searchParams] = useSearchParams();
//     const reference = searchParams.get("ref");
//     const token = sessionStorage.getItem("access_token");

//     const [submitted, setSubmitted] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const [form, setForm] = useState({
//         surname: "", firstname: "", othername: "", dob: "", gender: "", phone: "",
//         home_state: "", home_lga: "", home_city: "", home_house: "", home_street: "",
//         company_state: "", company_lga: "", company_city: "", company_house: "", company_street: "", company_email: "",
//         business_name1: "", business_name2: "", personal_email: "",
//         object1: "", object2: "", object3: "", object4: "",
//         witness_surname: "", witness_firstname: "", witness_othername: "", witness_dob: "", witness_gender: "", witness_phone: "",
//         witness_state: "", witness_lga: "", witness_city: "", witness_house: "", witness_street: "",
//         id_card: null, signature_director: null, signature_witness: null, nin: null,
//     });

//     const whatsappNumber = "2347026023535";
//     const whatsappMessage = encodeURIComponent(
//         `Hello Support Team,

// I have completed payment for CAC Company Registration.

// Product ID: ${id}
// Payment Reference: ${reference}

// I have submitted my CAC registration details and would like to upload my proof of payment and documents.

// Thank you.`
//     );

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (files) {
//             setForm({ ...form, [name]: files[0] });
//         } else {
//             setForm({ ...form, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             // Prepare requirements object (only text fields)
//             const requirements = { ...form };
//             delete requirements.id_card;
//             delete requirements.signature_director;
//             delete requirements.signature_witness;
//             delete requirements.nin;

//             const formData = new FormData();
//             formData.append("product", id);
//             formData.append("full_name", `${form.firstname} ${form.surname}`);
//             formData.append("email", form.personal_email);
//             formData.append("requirements", JSON.stringify(requirements));

//             // Append files separately
//             if (form.id_card) formData.append("id_card", form.id_card);
//             if (form.signature_director) formData.append("signature_director", form.signature_director);
//             if (form.signature_witness) formData.append("signature_witness", form.signature_witness);
//             if (form.nin) formData.append("nin", form.nin);

//             await axios.post(
//                 `http://127.0.0.1:8000/store/digital-orders/create/`,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             setSubmitted(true);
//         } catch (err) {
//             console.error(err);
//             setError("Failed to submit information. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (submitted) {
//         return (
//             <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center space-y-4">
//                 <h2 className="text-2xl font-bold text-green-700">Information Submitted Successfully</h2>
//                 <p className="text-gray-700">
//                     Upload your proof of payment and our support team will reach out to you shortly.
//                 </p>
//                 <a
//                     href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-bold mt-4"
//                 >
//                     Contact WhatsApp Support
//                 </a>
//             </div>
//         );
//     }

//     return (
//         <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mt-6 p-6 bg-gray-50 rounded-xl shadow space-y-6">
//             <h2 className="text-3xl font-bold text-[#003366] text-center mb-6">CAC Company Registration Form</h2>
//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//             {/* DIRECTOR DETAILS */}
//             <Section title="Director Details">
//                 <InputField label="Surname" name="surname" placeholder="e.g., Ade" form={form} handleChange={handleChange} required />
//                 <InputField label="First Name" name="firstname" placeholder="e.g., John" form={form} handleChange={handleChange} required />
//                 <InputField label="Other Name" name="othername" placeholder="Optional" form={form} handleChange={handleChange} />
//                 <InputField label="Date of Birth" name="dob" type="date" form={form} handleChange={handleChange} required />
//                 <SelectField label="Gender" name="gender" options={["Male", "Female", "Other"]} form={form} handleChange={handleChange} required />
//                 <InputField label="Phone Number" name="phone" placeholder="e.g., 08012345678" form={form} handleChange={handleChange} required />
//             </Section>

//             {/* HOME ADDRESS */}
//             <Section title="Home Address">
//                 <InputField label="State" name="home_state" placeholder="e.g., Lagos" form={form} handleChange={handleChange} required />
//                 <InputField label="LGA" name="home_lga" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} required />
//                 <InputField label="City/Town/Village" name="home_city" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} required />
//                 <InputField label="House Number" name="home_house" placeholder="e.g., 12" form={form} handleChange={handleChange} />
//                 <InputField label="Street Name" name="home_street" placeholder="e.g., Allen Avenue" form={form} handleChange={handleChange} />
//             </Section>

//             {/* COMPANY ADDRESS */}
//             <Section title="Company Address">
//                 <InputField label="State" name="company_state" placeholder="e.g., Lagos" form={form} handleChange={handleChange} required />
//                 <InputField label="LGA" name="company_lga" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} required />
//                 <InputField label="City/Town/Village" name="company_city" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} required />
//                 <InputField label="House Number" name="company_house" placeholder="e.g., 12" form={form} handleChange={handleChange} />
//                 <InputField label="Street Name" name="company_street" placeholder="e.g., Allen Avenue" form={form} handleChange={handleChange} />
//                 <InputField label="Company Email" name="company_email" placeholder="e.g., info@company.com" type="email" form={form} handleChange={handleChange} required />
//             </Section>

//             {/* BUSINESS NAMES */}
//             <Section title="Proposed Business Names">
//                 <InputField label="Business Name 1" name="business_name1" placeholder="e.g., Tech Solutions Ltd" form={form} handleChange={handleChange} required />
//                 <InputField label="Business Name 2" name="business_name2" placeholder="Optional" form={form} handleChange={handleChange} />
//                 <InputField label="Personal Email" name="personal_email" placeholder="e.g., you@example.com" type="email" form={form} handleChange={handleChange} required />
//             </Section>

//             {/* OBJECT OF MEMORANDUM */}
//             <Section title="Object of Memorandum">
//                 <p className="text-gray-500 text-sm mb-2">Example 1: SALES AND SUPPLIES OF COMPUTER HARDWARE AND SOFTWARE</p>
//                 <p className="text-gray-500 text-sm mb-2">Example 2: REPAIR AND MAINTENANCE OF COMPUTER HARDWARE AND SOFTWARE</p>
//                 <InputField label="Object 1" name="object1" placeholder="What your company will do" form={form} handleChange={handleChange} required />
//                 <InputField label="Object 2" name="object2" placeholder="Optional" form={form} handleChange={handleChange} />
//                 <InputField label="Object 3" name="object3" placeholder="Optional" form={form} handleChange={handleChange} />
//                 <InputField label="Object 4" name="object4" placeholder="Optional" form={form} handleChange={handleChange} />
//             </Section>

//             {/* WITNESS DETAILS */}
//             <Section title="Witness Details">
//                 <InputField label="Surname" name="witness_surname" placeholder="e.g., Ade" form={form} handleChange={handleChange} required />
//                 <InputField label="First Name" name="witness_firstname" placeholder="e.g., John" form={form} handleChange={handleChange} required />
//                 <InputField label="Other Name" name="witness_othername" placeholder="Optional" form={form} handleChange={handleChange} />
//                 <InputField label="Date of Birth" name="witness_dob" type="date" form={form} handleChange={handleChange} required />
//                 <SelectField label="Gender" name="witness_gender" options={["Male", "Female", "Other"]} form={form} handleChange={handleChange} required />
//                 <InputField label="Phone Number" name="witness_phone" placeholder="e.g., 08012345678" form={form} handleChange={handleChange} required />
//                 <InputField label="State" name="witness_state" placeholder="e.g., Lagos" form={form} handleChange={handleChange} />
//                 <InputField label="LGA" name="witness_lga" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} />
//                 <InputField label="City/Town/Village" name="witness_city" placeholder="e.g., Ikeja" form={form} handleChange={handleChange} />
//                 <InputField label="House Number" name="witness_house" placeholder="e.g., 12" form={form} handleChange={handleChange} />
//                 <InputField label="Street Name" name="witness_street" placeholder="e.g., Allen Avenue" form={form} handleChange={handleChange} />
//             </Section>

//             {/* SUPPORTING DOCUMENTS */}
//             <Section title="Supporting Documents">
//                 <FileField label="ID Card (snap and upload)" name="id_card" form={form} handleChange={handleChange} />
//                 <FileField label="Director Signature" name="signature_director" form={form} handleChange={handleChange} />
//                 <FileField label="Witness Signature" name="signature_witness" form={form} handleChange={handleChange} />
//                 <FileField label="NIN" name="nin" form={form} handleChange={handleChange} />
//             </Section>

//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-bold mt-4"
//             >
//                 {loading ? "Submitting..." : "Submit CAC Information"}
//             </button>
//         </form>
//     );
// }















// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// /* ================= Helper Components ================= */

// const InputField = ({ label, name, type = "text", required = false, form, handleChange }) => (
//   <div className="flex flex-col mb-3">
//     <label className="font-semibold mb-1">{label}</label>
//     <input
//       type={type}
//       name={name}
//       required={required}
//       value={form[name] || ""}
//       onChange={handleChange}
//       className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
//     />
//   </div>
// );

// const FileField = ({ label, name, handleChange, preview }) => (
//   <div className="flex flex-col mb-3">
//     <label className="font-semibold mb-1">{label}</label>
//     <input
//       type="file"
//       name={name}
//       onChange={handleChange}
//       className="p-2 border border-gray-300 rounded w-full"
//     />

//     {/* Preview */}
//     {preview && (
//       <div className="mt-2">
//         {preview.startsWith("blob:") || preview.match(/\.(jpg|jpeg|png|webp)$/i) ? (
//           <img src={preview} alt="preview" className="h-28 rounded border" />
//         ) : (
//           <a
//             href={preview}
//             target="_blank"
//             rel="noreferrer"
//             className="text-blue-600 underline"
//           >
//             View uploaded file
//           </a>
//         )}
//       </div>
//     )}
//   </div>
// );

// const SelectField = ({ label, name, options, required = false, form, handleChange }) => (
//   <div className="flex flex-col mb-3">
//     <label className="font-semibold mb-1">{label}</label>
//     <select
//       name={name}
//       value={form[name] || ""}
//       onChange={handleChange}
//       required={required}
//       className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
//     >
//       <option value="">Select {label}</option>
//       {options.map(opt => (
//         <option key={opt} value={opt}>{opt}</option>
//       ))}
//     </select>
//   </div>
// );

// const Section = ({ title, children }) => (
//   <div className="bg-white p-5 rounded-lg shadow space-y-3 mb-4">
//     <h3 className="text-xl font-semibold border-b pb-1 mb-3">{title}</h3>
//     {children}
//   </div>
// );

// /* ================= Main Component ================= */

// export default function DigitalPostPayment() {
//   const { id } = useParams();
//   const token = sessionStorage.getItem("access_token");

//   const [product, setProduct] = useState(null);
//   const [form, setForm] = useState({});
//   const [filePreview, setFilePreview] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= Fetch Product ================= */
//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/store/products/${id}/`);
//         const data = res.data;

//         setProduct(data);

//         const initialForm = {};
//         const previews = {};

//         data.form_structure.sections.forEach(section => {
//           section.fields.forEach(field => {
//             initialForm[field] = "";
//           });
//         });

//         data.form_structure.file_fields.forEach(field => {
//           initialForm[field] = null;
//           previews[field] = null;
//         });

//         setForm(initialForm);
//         setFilePreview(previews);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch product information.");
//       }
//     }

//     fetchProduct();
//   }, [id]);

//   /* ================= Handle Change ================= */
//   const handleChange = (e) => {
//     const { name, value, files, type } = e.target;

//     if (type === "file") {
//       const file = files[0];
//       setForm(prev => ({ ...prev, [name]: file }));

//       if (file) {
//         setFilePreview(prev => ({
//           ...prev,
//           [name]: URL.createObjectURL(file),
//         }));
//       }
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   /* ================= Submit ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const requirements = { ...form };
//       product.form_structure.file_fields.forEach(f => delete requirements[f]);

//       const formData = new FormData();
//       formData.append("product", product.id);
//       formData.append(
//         "full_name",
//         form.firstname ? `${form.firstname} ${form.surname}` : form.business_name1 || ""
//       );
//       formData.append("email", form.personal_email || form.email || "");
//       formData.append("requirements", JSON.stringify(requirements));

//       product.form_structure.file_fields.forEach(f => {
//         if (form[f]) formData.append(f, form[f]);
//       });

//       await axios.post(
//         "http://127.0.0.1:8000/store/digital-orders/create/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setSubmitted(true);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to submit information.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */

//   if (!product) return <p className="text-center mt-10">Loading form...</p>;

//   if (submitted) {
//     return (
//       <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
//         <h2 className="text-2xl font-bold text-green-700">
//           Information Submitted Successfully
//         </h2>
//         <p className="text-gray-700 mt-2">
//           Our team will review your documents and contact you shortly.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-5xl mx-auto mt-6 p-6 bg-gray-50 rounded-xl shadow space-y-6"
//     >
//       <h2 className="text-3xl font-bold text-[#003366] text-center mb-6">
//         {product.digital_category?.toUpperCase()} Registration Form
//       </h2>

//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {product.form_structure.sections.map(section => (
//         <Section key={section.title} title={section.title}>
//           {section.fields.map(field => {
//             if (product.form_structure.file_fields.includes(field)) return null;

//             if (field === "dob" || field === "witness_dob") {
//               return (
//                 <InputField
//                   key={field}
//                   label={field.replace(/_/g, " ").toUpperCase()}
//                   name={field}
//                   type="date"
//                   form={form}
//                   handleChange={handleChange}
//                 />
//               );
//             }

//             if (["gender", "witness_gender", "marital_status", "title"].includes(field)) {
//               const options =
//                 field.includes("gender")
//                   ? ["Male", "Female", "Other"]
//                   : ["Mr", "Mrs", "Miss", "Dr", "Prof"];

//               return (
//                 <SelectField
//                   key={field}
//                   label={field.replace(/_/g, " ").toUpperCase()}
//                   name={field}
//                   options={options}
//                   form={form}
//                   handleChange={handleChange}
//                 />
//               );
//             }

//             return (
//               <InputField
//                 key={field}
//                 label={field.replace(/_/g, " ").toUpperCase()}
//                 name={field}
//                 form={form}
//                 handleChange={handleChange}
//               />
//             );
//           })}
//         </Section>
//       ))}

//       {/* FILE UPLOADS */}
//       <Section title="Supporting Documents">
//         {product.form_structure.file_fields.map(field => (
//           <FileField
//             key={field}
//             label={field.replace(/_/g, " ").toUpperCase()}
//             name={field}
//             handleChange={handleChange}
//             preview={filePreview[field]}
//           />
//         ))}
//       </Section>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-bold"
//       >
//         {loading ? "Submitting..." : "Submit Information"}
//       </button>
//     </form>
//   );
// }















// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// /* ================= Helper Components ================= */

// const InputField = ({ label, name, type = "text", required = false, form, handleChange }) => (
//   <div className="flex flex-col mb-3">
//     <label className="font-semibold mb-1">{label}</label>
//     <input
//       type={type}
//       name={name}
//       required={required}
//       value={form[name] || ""}
//       onChange={handleChange}
//       className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
//     />
//   </div>
// );

// const FileField = ({ label, name, handleChange, preview }) => (
//   <div className="flex flex-col mb-3">
//     <label className="font-semibold mb-1">{label}</label>
//     <input
//       type="file"
//       name={name}
//       onChange={handleChange}
//       className="p-2 border border-gray-300 rounded w-full"
//     />
//     {preview && (
//       <div className="mt-2">
//         {preview.startsWith("blob:") || preview.match(/\.(jpg|jpeg|png|webp)$/i) ? (
//           <img src={preview} alt="preview" className="h-28 rounded border" />
//         ) : (
//           <a
//             href={preview}
//             target="_blank"
//             rel="noreferrer"
//             className="text-blue-600 underline"
//           >
//             View uploaded file
//           </a>
//         )}
//       </div>
//     )}
//   </div>
// );

// const SelectField = ({ label, name, options, required = false, form, handleChange }) => (
//   <div className="flex flex-col mb-3">
//     <label className="font-semibold mb-1">{label}</label>
//     <select
//       name={name}
//       value={form[name] || ""}
//       onChange={handleChange}
//       required={required}
//       className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
//     >
//       <option value="">Select {label}</option>
//       {options.map(opt => (
//         <option key={opt} value={opt}>{opt}</option>
//       ))}
//     </select>
//   </div>
// );

// const Section = ({ title, children }) => (
//   <div className="bg-white p-5 rounded-lg shadow space-y-3 mb-4">
//     <h3 className="text-xl font-semibold border-b pb-1 mb-3">{title}</h3>
//     {children}
//   </div>
// );

// /* ================= Main Component ================= */

// export default function DigitalPostPayment() {
//   const { id } = useParams();
//   const token = sessionStorage.getItem("access_token");

//   const [product, setProduct] = useState(null);
//   const [form, setForm] = useState({});
//   const [filePreview, setFilePreview] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= Fetch Product ================= */
//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/store/products/${id}/`);
//         const data = res.data;

//         setProduct(data);

//         const initialForm = {};
//         const previews = {};

//         data.form_structure.sections.forEach(section => {
//           section.fields.forEach(field => {
//             initialForm[field] = "";
//           });
//         });

//         data.form_structure.file_fields.forEach(field => {
//           initialForm[field] = null;
//           previews[field] = null;
//         });

//         setForm(initialForm);
//         setFilePreview(previews);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch product information.");
//       }
//     }

//     fetchProduct();
//   }, [id]);

//   /* ================= Handle Change ================= */
//   const handleChange = (e) => {
//     const { name, value, files, type } = e.target;

//     if (type === "file") {
//       const file = files[0];
//       setForm(prev => ({ ...prev, [name]: file }));

//       if (file) {
//         setFilePreview(prev => ({
//           ...prev,
//           [name]: URL.createObjectURL(file),
//         }));
//       }
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   /* ================= Submit ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const requirements = { ...form };
//       product.form_structure.file_fields.forEach(f => delete requirements[f]);

//       const formData = new FormData();
//       formData.append("product", product.id);
//       formData.append(
//         "full_name",
//         form.firstname ? `${form.firstname} ${form.surname}` : form.business_name1 || ""
//       );
//       formData.append("email", form.personal_email || form.email || "");
//       formData.append("requirements", JSON.stringify(requirements));

//       product.form_structure.file_fields.forEach(f => {
//         if (form[f]) formData.append(f, form[f]);
//       });

//       await axios.post(
//         "http://127.0.0.1:8000/store/digital-orders/create/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setSubmitted(true);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to submit information.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */

//   if (!product) return <p className="text-center mt-10">Loading form...</p>;

//   if (submitted) {
//     return (
//       <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center space-y-4">
//         <h2 className="text-2xl font-bold text-green-700">
//           Information Submitted Successfully
//         </h2>
//         <p className="text-gray-700">
//           Upload your proof of payment and our support team will reach out to you within 24 hours.
//         </p>
//         <a
//           href="https://wa.me/2347026023535"
//           target="_blank"
//           rel="noreferrer"
//           className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
//         >
//           Contact Support on WhatsApp
//         </a>
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-5xl mx-auto mt-6 p-6 bg-gray-50 rounded-xl shadow space-y-6"
//     >
//       <h2 className="text-3xl font-bold text-[#003366] text-center mb-6">
//         {product.digital_category?.toUpperCase()} Registration Form
//       </h2>

//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {product.form_structure.sections.map(section => (
//         <Section key={section.title} title={section.title}>
//           {section.fields.map(field => {
//             if (product.form_structure.file_fields.includes(field)) return null;

//             if (field === "dob" || field === "witness_dob") {
//               return (
//                 <InputField
//                   key={field}
//                   label={field.replace(/_/g, " ").toUpperCase()}
//                   name={field}
//                   type="date"
//                   form={form}
//                   handleChange={handleChange}
//                 />
//               );
//             }

//             if (["gender", "witness_gender", "marital_status", "title"].includes(field)) {
//               const options =
//                 field.includes("gender")
//                   ? ["Male", "Female", "Other"]
//                   : ["Mr", "Mrs", "Miss", "Dr", "Prof"];

//               return (
//                 <SelectField
//                   key={field}
//                   label={field.replace(/_/g, " ").toUpperCase()}
//                   name={field}
//                   options={options}
//                   form={form}
//                   handleChange={handleChange}
//                 />
//               );
//             }

//             return (
//               <InputField
//                 key={field}
//                 label={field.replace(/_/g, " ").toUpperCase()}
//                 name={field}
//                 form={form}
//                 handleChange={handleChange}
//               />
//             );
//           })}
//         </Section>
//       ))}

//       {/* FILE UPLOADS */}
//       <Section title="Supporting Documents">
//         {product.form_structure.file_fields.map(field => (
//           <FileField
//             key={field}
//             label={field.replace(/_/g, " ").toUpperCase()}
//             name={field}
//             handleChange={handleChange}
//             preview={filePreview[field]}
//           />
//         ))}
//       </Section>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-bold"
//       >
//         {loading ? "Submitting..." : "Submit Information"}
//       </button>
//     </form>
//   );
// }













import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/* ================= Helper Components ================= */

const InputField = ({ label, name, type = "text", required = false, form, handleChange }) => (
  <div className="flex flex-col mb-3">
    <label className="font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      value={form[name] || ""}
      onChange={handleChange}
      className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
    />
  </div>
);

const FileField = ({ label, name, handleChange, preview }) => (
  <div className="flex flex-col mb-3">
    <label className="font-semibold mb-1">{label}</label>
    <input
      type="file"
      name={name}
      onChange={handleChange}
      className="p-2 border border-gray-300 rounded w-full"
    />
    {preview && (
      <div className="mt-2">
        {preview.startsWith("blob:") || preview.match(/\.(jpg|jpeg|png|webp)$/i) ? (
          <img src={preview} alt="preview" className="h-28 rounded border" />
        ) : (
          <a
            href={preview}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View uploaded file
          </a>
        )}
      </div>
    )}
  </div>
);

const SelectField = ({ label, name, options, required = false, form, handleChange }) => (
  <div className="flex flex-col mb-3">
    <label className="font-semibold mb-1">{label}</label>
    <select
      name={name}
      value={form[name] || ""}
      onChange={handleChange}
      required={required}
      className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white p-5 rounded-lg shadow space-y-3 mb-4">
    <h3 className="text-xl font-semibold border-b pb-1 mb-3">{title}</h3>
    {children}
  </div>
);

/* ================= Main Component ================= */

export default function DigitalPostPayment() {
  const { id } = useParams();
  const token = sessionStorage.getItem("access_token");

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({});
  const [filePreview, setFilePreview] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= Fetch Product ================= */
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/store/products/${id}/`);
        const data = res.data;

        setProduct(data);

        const initialForm = {};
        const previews = {};

        // Initialize text fields
        data.form_structure.sections.forEach(section => {
          section.fields.forEach(field => {
            initialForm[field] = "";
          });
        });

        // Initialize file fields
        data.form_structure.file_fields.forEach(field => {
          initialForm[field] = null;
          previews[field] = null;
        });

        setForm(initialForm);
        setFilePreview(previews);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product information.");
      }
    }

    fetchProduct();
  }, [id]);

  /* ================= Handle Change ================= */
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      setForm(prev => ({ ...prev, [name]: file }));

      if (file) {
        setFilePreview(prev => ({
          ...prev,
          [name]: URL.createObjectURL(file),
        }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  /* ================= Handle Submit ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      // Always include the product
      formData.append("product", product.id);

      // Helper to append only if value exists
      const appendField = (formKey, modelKey) => {
        const value = form[formKey];
        if (value !== undefined && value !== null && value !== "") {
          formData.append(modelKey, value);
        }
      };

      // Top-level fields
      appendField("full_name", "full_name");
      appendField("username", "username");
      appendField("email", "email");
      appendField("phone", "phone");

      // Personal / Moniepoint info
      [
        "bvn", "first_name", "last_name", "title", "marital_status",
        "religion", "nationality", "state_of_origin", "lga_of_origin",
        "employment_status", "address", "home_address", "country", "state", "city", "lga"
      ].forEach(f => appendField(f, f));

      // Date fields (dob)
      appendField("dob", "dob");
      appendField("next_of_kin_dob", "next_of_kin_dob");

      // Next of kin
      [
        "next_of_kin_name", "next_of_kin_phone", "next_of_kin_relationship",
        "next_of_kin_email", "next_of_kin_address", "next_of_kin_country",
        "next_of_kin_state", "next_of_kin_city", "next_of_kin_lga"
      ].forEach(f => appendField(f, f));

      // Business info
      appendField("business_name_pos", "business_name_pos");
      appendField("nature_of_business_pos", "nature_of_business_pos");

      // Other text fields from sections
      product.form_structure.sections.forEach(section => {
        section.fields.forEach(field => {
          if (!product.form_structure.file_fields.includes(field)) {
            appendField(field, field);
          }
        });
      });

      // File fields
      product.form_structure.file_fields.forEach(f => {
        if (form[f]) formData.append(f, form[f]);
      });

      // Submit to backend
      await axios.post(
        "http://127.0.0.1:8000/store/digital-orders/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit information.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  if (!product) return <p className="text-center mt-10">Loading form...</p>;

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-700">
          Information Submitted Successfully
        </h2>
        <p className="text-gray-700">
          Upload your proof of payment and our support team will reach out to you within 24 hours.
        </p>
        <a
          href="https://wa.me/2347026023535"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Contact Support on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto mt-6 p-6 bg-gray-50 rounded-xl shadow space-y-6"
    >
      <h2 className="text-3xl font-bold text-[#003366] text-center mb-6">
        {product.digital_category?.toUpperCase()} Registration Form
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {product.form_structure.sections.map(section => (
        <Section key={section.title} title={section.title}>
          {section.fields.map(field => {
            if (product.form_structure.file_fields.includes(field)) return null;

            if (field === "dob" || field === "witness_dob") {
              return (
                <InputField
                  key={field}
                  label={field.replace(/_/g, " ").toUpperCase()}
                  name={field}
                  type="date"
                  form={form}
                  handleChange={handleChange}
                />
              );
            }

            if (["gender", "witness_gender", "marital_status", "title"].includes(field)) {
              const options =
                field.includes("gender")
                  ? ["Male", "Female", "Other"]
                  : ["Mr", "Mrs", "Miss", "Dr", "Prof"];

              return (
                <SelectField
                  key={field}
                  label={field.replace(/_/g, " ").toUpperCase()}
                  name={field}
                  options={options}
                  form={form}
                  handleChange={handleChange}
                />
              );
            }

            return (
              <InputField
                key={field}
                label={field.replace(/_/g, " ").toUpperCase()}
                name={field}
                form={form}
                handleChange={handleChange}
              />
            );
          })}
        </Section>
      ))}

      {/* FILE UPLOADS */}
      <Section title="Supporting Documents">
        {product.form_structure.file_fields.map(field => (
          <FileField
            key={field}
            label={field.replace(/_/g, " ").toUpperCase()}
            name={field}
            handleChange={handleChange}
            preview={filePreview[field]}
          />
        ))}
      </Section>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-bold"
      >
        {loading ? "Submitting..." : "Submit Information"}
      </button>
    </form>
  );
}
