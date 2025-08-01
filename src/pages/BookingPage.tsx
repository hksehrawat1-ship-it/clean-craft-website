import React, { useEffect, useState } from "react";
import { contentService } from "../lib/strapi/services/content.service";
import { useStrapiServices } from "@/hooks/useStrapi";
import { useCountry } from "@/contexts/CountryContext";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [showOtherForm, setShowOtherForm] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    customCity: "",
  });

  const { currentCountry } = useCountry();
  const { data: strapiServices, isLoading, error } = useStrapiServices();
  const navigate = useNavigate(); // <-- Navigation hook

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityList = await contentService.getCitiesForBooking();
        const uniqueCities = Array.from(
          new Set(cityList.map((city) => city.toUpperCase()))
        );
        setCities(uniqueCities);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };
    fetchCities();
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    setShowOtherForm(value === "OTHER");
    setShowForm(false);
  };

  const handleCheckboxChange = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    if (!selectedCity) return toast.error("Please select a city");
    if (selectedServices.length === 0)
      return toast.error("Please select at least one service");
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = showOtherForm
      ? {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          manual_city: formData.customCity,
          services: selectedServices.join(", "),
        }
      : {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: selectedCity,
          services: selectedServices.join(", "),
        };

    try {
      const endpoint = showOtherForm ? "/interesting-leads" : "/bookings";
      const baseUrl = import.meta.env.VITE_STRAPI_URL?.replace(/\/+$/, "");

      await axios.post(
        `${baseUrl}${endpoint}`,
        { data: payload },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Booking submitted successfully!");
      setFormData({ name: "", email: "", phone: "", customCity: "" });
      setSelectedServices([]);
      setSelectedCity("");
      setShowForm(false);

      // ✅ Redirect to homepage after successful submit
      navigate(`/${currentCountry || "in"}`);
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Something went wrong while submitting.");
    }
  };

  const displayServices = (strapiServices?.data || []).map((service: any) => {
    let priceType = service.price_type?.trim();
    const slug = service.slug?.toLowerCase() || "";
    if (!priceType) {
      priceType =
        slug.includes("wash") || slug.includes("laundry") ? "kg" : "item";
    }
    return { ...service, price_type: priceType };
  });

  return (
    <div className="p-4 max-w-xl mx-auto shadow-lg">
      <div className="flex items-center justify-center mb-4 space-x-2">
        <Link to={`/${currentCountry || "in"}`}>
          <img
            src="/lovable-uploads/cleancraft-icon.png"
            alt="CleanCraft Icon"
            className="w-12 h-12"
          />
        </Link>
        <span className="text-xl font-semibold text-gray-800">CleanCraft</span>
      </div>

      <label className="block font-semibold mb-2">Select your city:</label>
      <select
        className="w-full border p-2 mb-4"
        onChange={handleCityChange}
        value={selectedCity}
      >
        <option disabled value="">
          -- Select City --
        </option>
        {cities.map((city, idx) => (
          <option key={idx} value={city}>
            {city}
          </option>
        ))}
        <option value="OTHER">Other</option>
      </select>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Select Services</h3>
        {isLoading ? (
          <p>Loading services...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load services</p>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-3">
            {displayServices.map((service: any) => (
              <label
                key={service.id}
                className="block border rounded-lg p-3 bg-white hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="mt-1 accent-blue-600"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleCheckboxChange(service.id)}
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {service.name}
                    </div>
                    {service.description && (
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {service.description}
                      </div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {selectedServices.length > 0 && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Selected Services:</label>
          <ul className="space-y-2">
            {displayServices
              .filter((s: any) => selectedServices.includes(s.id))
              .map((service: any) => (
                <li
                  key={service.id}
                  className="flex justify-between items-center border p-2 bg-gray-50 rounded"
                >
                  <span className="text-gray-700 text-sm">{service.name}</span>
                  <button
                    onClick={() =>
                      setSelectedServices((prev) =>
                        prev.filter((s) => s !== service.id)
                      )
                    }
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑️
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {!showForm && (
        <button
          onClick={handleContinue}
          disabled={!selectedCity || selectedServices.length === 0}
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            selectedCity && selectedServices.length > 0
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      )}

      {showForm && (
        <form className="space-y-3 mt-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border w-full p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border w-full p-2"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border w-full p-2"
            required
          />
          {showOtherForm ? (
            <input
              type="text"
              name="customCity"
              placeholder="Enter your city"
              value={formData.customCity}
              onChange={handleInputChange}
              className="border w-full p-2"
              required
            />
          ) : (
            <input
              type="text"
              value={selectedCity}
              readOnly
              className="border w-full p-2 bg-gray-100"
            />
          )}
          <input
            type="text"
            value={displayServices
              .filter((s: any) => selectedServices.includes(s.id))
              .map((s: any) => s.name)
              .join(", ")}
            readOnly
            className="border w-full p-2 bg-gray-100"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Submit Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingPage;
