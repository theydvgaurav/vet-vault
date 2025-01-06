import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaEdit } from "react-icons/fa"; // Importing the pencil icon from react-icons
import { useRouter } from "next/router";
import { Pet } from '@/lib/types'

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const router = useRouter();

  // Function to calculate the pet's age based on the dateOfBirth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const month = currentDate.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
      return Math.max(age - 1, 0);
    }
    return Math.max(age, 0);
  };

  const petAge = calculateAge(pet.dateOfBirth);

  // Function to format the date into MM/DD/YYYY
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const formattedDOB = formatDate(pet.dateOfBirth);

  // Handle Edit Button Click: redirect to edit page with petId
  const handleEditClick = () => {
    router.push(`/edit-pet/${pet.petId}`); // Using pet.id to redirect to the edit page
  };

  return (
    <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm hover:bg-slate-900/50 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{pet.petName}</h3>
          {/* Edit button with pencil icon */}
          <button
            onClick={handleEditClick}
            className="text-blue-500 hover:text-blue-700"
            aria-label="Edit Pet"
          >
            <FaEdit className="text-xl" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Breed:</dt>
            <dd>{pet.breed}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Age:</dt>
            <dd>{petAge} years</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Date of Birth:</dt>
            <dd>{formattedDOB}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Owner:</dt>
            <dd>{pet.ownerName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Address:</dt>
            <dd>{pet.address}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Mobile Number:</dt>
            <dd>{pet.mobileNumber}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
