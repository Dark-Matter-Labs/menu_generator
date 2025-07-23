"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Menu Generation Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g., Brussels, Tokyo, New York"
            required
          />
        </div>

        <div>
          <Label htmlFor="season">Season</Label>
          <Select name="season" defaultValue="Spring">
            <SelectTrigger>
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

        <div>
          <Label htmlFor="numberOfGuests">Number of Guests</Label>
          <Input
            id="numberOfGuests"
            name="numberOfGuests"
            type="number"
            min="1"
            max="20"
            defaultValue="4"
            required
          />
        </div>

        <div>
          <Label htmlFor="context">Context</Label>
          <textarea
            id="context"
            name="context"
            placeholder="Describe the context of this meal (e.g., family dinner, business lunch, celebration)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <Label htmlFor="goals">Goals</Label>
          <textarea
            id="goals"
            name="goals"
            placeholder="What are your goals for this meal? (e.g., sustainable, healthy, budget-friendly)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Generating Menus..." : "Generate Future Menus"}
        </Button>
      </form>
    </div>
  );
} 