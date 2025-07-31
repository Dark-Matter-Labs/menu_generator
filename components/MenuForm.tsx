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

interface MenuFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function MenuForm({ onSubmit }: MenuFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await onSubmit(formData);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-sm font-semibold text-gray-700"
            >
              Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Brussels, Tokyo, New York"
              className="h-12 px-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="season"
              className="text-sm font-semibold text-gray-700"
            >
              Season
            </Label>
            <Select name="season" defaultValue="Spring">
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
            max="20"
            defaultValue="4"
            className="h-12 px-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="context"
            className="text-sm font-semibold text-gray-700"
          >
            Context
          </Label>
          <textarea
            id="context"
            name="context"
            placeholder="Describe the context of this meal (e.g., family dinner, business lunch, celebration)"
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="goals"
            className="text-sm font-semibold text-gray-700"
          >
            Goals
          </Label>
          <textarea
            id="goals"
            name="goals"
            placeholder="What are your goals for this meal? (e.g., sustainable, healthy, budget-friendly)"
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:transform-none disabled:from-emerald-400 disabled:to-teal-400"
          disabled={isLoading}
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
