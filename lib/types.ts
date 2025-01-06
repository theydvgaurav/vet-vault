export interface PetFormData {
    petName: string;
    ownerName: string;
    mobileNumber: string;
    dateOfBirth: Date;
    breed: string;
    address: string;
}


export interface Pet {
    address: string;
    breed: string;
    createdAt: string;
    dateOfBirth: string;
    mobileNumber: string;
    ownerName: string;
    petId: string;
    petName: string;
    updatedAt: string;
    _id: string;
}

export type Schedule = {
    breed: string;
    date: string; 
    eventType: "deworming" | "rabiesInjection" | "nineInOneInjection"; 
    mobileNumber: string;
    ownerName: string;
    petId: string;
    petName: string;
    updatedAt: string;
    _id: string;
};