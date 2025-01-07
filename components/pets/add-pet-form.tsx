"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PawPrint } from "lucide-react";
import { DatePicker } from "./date-picker";
import { PetFormData } from "@/lib/types";
import axios from "axios";

export function AddPetForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<PetFormData>({
        petName: "",
        ownerName: "",
        mobileNumber: "",
        dateOfBirth: new Date(),
        breed: "",
        address: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) { setFormData(prev => ({ ...prev, dateOfBirth: date })) }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/pets/None', { ...formData })
            if (response.status !== 200) {
                throw new Error('Something went wrong!');
            }
            router.push('/pet-listing')
        } catch (error) {
            console.error("Failed to add pet:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border-blue-800 bg-blue-100 backdrop-blur-sm p-6 text-black">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="petName">Pet Name</Label>
                        <Input
                            id="petName"
                            name="petName"
                            value={formData.petName}
                            onChange={handleChange}
                            placeholder="Enter pet's name"
                            required
                            className="text-black border-black focus-visible:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ownerName">Owner Name</Label>
                        <Input
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            placeholder="Enter owner's name"
                            required
                            className="text-black border-black focus-visible:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobileNumber">Mobile Number</Label>
                        <Input
                            id="mobileNumber"
                            name="mobileNumber"
                            type="tel"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter 10 digit mobile number"
                            required
                            className="text-black border-black focus-visible:ring-primary"
                            pattern="[0-9]{10}"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <DatePicker
                            date={formData.dateOfBirth}
                            onSelect={handleDateChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="breed">Breed</Label>
                        <Input
                            id="breed"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            placeholder="Enter Breed"
                            required
                            className="text-black border-black focus-visible:ring-primary"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <textarea
                        id="address"
                        name="address"
                        className="w-full min-h-[100px] bg-white text-black px-3 py-2 rounded-md border border-slate-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-black"
                        onClick={() => (router.push('/pet-listing'))}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="outline" className="w-full border-black" disabled={isSubmitting}>
                        {isSubmitting ? "Adding Pet..." : "Add Pet"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
