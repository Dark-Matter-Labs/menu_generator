"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Image from "next/image";

interface MenuFormProps {
  form: {
    location: string;
    season: string;
    guests: number;
    context: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSeason: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function MenuForm({ form, onChange, onSeason, onSubmit, loading }: MenuFormProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl p-4 md:p-8">
      <form
        onSubmit={onSubmit}
        className="bg-[#1f1f1f] text-[#aaaaaa] rounded-lg shadow-lg p-8 flex flex-col gap-6 max-w-md w-full border border-[#506478]"
      >
        <div>
          <Label htmlFor="location" className="text-[#aaaaaa]">Location</Label>
          <Input
            id="location"
            name="location"
            value={form.location}
            onChange={onChange}
            className="mt-1 bg-[#282828] border-[#506478] text-[#aaaaaa] focus:ring-[#506478]"
            required
          />
        </div>
        <div>
          <Label htmlFor="season" className="text-[#aaaaaa]">Season</Label>
          <Select value={form.season} onValueChange={onSeason}>
            <SelectTrigger className="mt-1 bg-[#282828] border-[#506478] text-[#aaaaaa] focus:ring-[#506478]">
              <SelectValue placeholder="Select a season" />
            </SelectTrigger>
            <SelectContent className="bg-[#282828] text-[#aaaaaa] border-[#506478]">
              <SelectItem value="Spring">Spring</SelectItem>
              <SelectItem value="Summer">Summer</SelectItem>
              <SelectItem value="Autumn">Autumn</SelectItem>
              <SelectItem value="Winter">Winter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="guests" className="text-[#aaaaaa]">Number of guests</Label>
          <Input
            id="guests"
            name="guests"
            type="number"
            min={1}
            value={form.guests}
            onChange={onChange}
            className="mt-1 bg-[#282828] border-[#506478] text-[#aaaaaa] focus:ring-[#506478]"
            required
          />
        </div>
        <div>
          <Label htmlFor="context" className="text-[#aaaaaa]">Context and Goals</Label>
          <textarea
            id="context"
            name="context"
            value={form.context}
            onChange={onChange}
            className="mt-1 bg-[#282828] border-[#506478] text-[#aaaaaa] focus:ring-[#506478] rounded-md w-full min-h-[80px] p-2"
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-[#506478] hover:bg-[#011426] text-[#aaaaaa] font-semibold mt-2"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <div className="flex-1 flex justify-center">
        <Image
          src="/table.png"
          alt="Table"
          width={400}
          height={400}
          className="rounded-lg shadow-lg object-contain max-h-[400px] bg-[#EBE8DB]"
          priority
        />
      </div>
    </div>
  );
} 