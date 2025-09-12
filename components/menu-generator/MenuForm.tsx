"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function MenuForm({ onSubmit }: MenuFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    season: "",
    numberOfGuests: "4",
    dinnerContext: "",
    dietaryPreference: "",
    allergies: "",
    preferences: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.location.trim() !== "" &&
      formData.season !== "" &&
      formData.numberOfGuests !== "" &&
      formData.dietaryPreference !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Create FormData manually with state values since we're using controlled components
    const submitFormData = new FormData();
    submitFormData.append("location", formData.location);
    submitFormData.append("season", formData.season);
    submitFormData.append("numberOfGuests", formData.numberOfGuests);
    submitFormData.append("dinnerContext", formData.dinnerContext);
    submitFormData.append("dietaryPreference", formData.dietaryPreference);
    submitFormData.append("allergies", formData.allergies);
    submitFormData.append("preferences", formData.preferences);

    try {
      await onSubmit(submitFormData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Menu Generation Form
        </h2>
        <p className="text-gray-600">
          Fill in the details to generate your future scenario menus
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="context" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="context">Dinner Context</TabsTrigger>
            <TabsTrigger value="dietary">Dietary Requirements</TabsTrigger>
          </TabsList>

          {/* Dinner Context Tab */}
          <TabsContent value="context" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-sm font-semibold text-gray-700"
                >
                  Location
                </Label>
                <Select
                  name="location"
                  value={formData.location}
                  onValueChange={value => handleSelectChange("location", value)}
                >
                  <SelectTrigger className="h-12 px-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all duration-200">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Austria">Austria</SelectItem>
                    <SelectItem value="Belgium">Belgium</SelectItem>
                    <SelectItem value="Denmark">Denmark</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                    <SelectItem value="Poland">Poland</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Sweden">Sweden</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="season"
                  className="text-sm font-semibold text-gray-700"
                >
                  Season
                </Label>
                <Select
                  name="season"
                  value={formData.season}
                  onValueChange={value => handleSelectChange("season", value)}
                >
                  <SelectTrigger className="h-12 px-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all duration-200">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spring">Spring</SelectItem>
                    <SelectItem value="Summer">Summer</SelectItem>
                    <SelectItem value="Autumn">Autumn</SelectItem>
                    <SelectItem value="Winter">Winter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="numberOfGuests"
                className="text-sm font-semibold text-gray-700"
              >
                Number of Guests
              </Label>
              <Input
                id="numberOfGuests"
                name="numberOfGuests"
                type="number"
                min="1"
                max="40"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                className="h-12 px-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dinnerContext"
                className="text-sm font-semibold text-gray-700"
              >
                Dinner Context and Goals
              </Label>
              <textarea
                id="dinnerContext"
                name="dinnerContext"
                placeholder="Describe the context and goals for this meal (e.g., family dinner celebration, sustainable and healthy options, budget-friendly business lunch)"
                rows={4}
                value={formData.dinnerContext}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
              />
            </div>
          </TabsContent>

          {/* Dietary Requirements Tab */}
          <TabsContent value="dietary" className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Dietary Preference
              </Label>
              <Select
                name="dietaryPreference"
                value={formData.dietaryPreference}
                onValueChange={value =>
                  handleSelectChange("dietaryPreference", value)
                }
              >
                <SelectTrigger className="h-12 px-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all duration-200">
                  <SelectValue placeholder="Select dietary preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="pescatarian">Pescatarian</SelectItem>
                  <SelectItem value="meat">Meat Eater</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="allergies"
                className="text-sm font-semibold text-gray-700"
              >
                Allergies and Restrictions
              </Label>
              <textarea
                id="allergies"
                name="allergies"
                placeholder="List any allergies, intolerances, or dietary restrictions (e.g., gluten-free, dairy allergy, nut allergy)"
                rows={3}
                value={formData.allergies}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="preferences"
                className="text-sm font-semibold text-gray-700"
              >
                Additional Preferences
              </Label>
              <textarea
                id="preferences"
                name="preferences"
                placeholder="Any other preferences or requirements (e.g., low-sodium, spicy food preference, organic ingredients only)"
                rows={3}
                value={formData.preferences}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Submit Button */}
        <Button
          type="submit"
          className={`w-full h-14 text-white font-semibold text-lg rounded-xl transition-all duration-200 ${
            isFormValid() && !isLoading
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              : "bg-gray-400 cursor-not-allowed transform-none shadow-none"
          }`}
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Future Menus...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Generate Future Menus</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}
