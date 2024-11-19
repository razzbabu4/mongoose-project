// import { Schema, model, connect } from 'mongoose';

export type Guardian = {
    fatherName: string;
    motherName: string;
    fatherOccupation: string;
    motherOccupation: string;
    fatherContactNo: string;
    motherContactNo: string;
}

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}
export type Student = {
    id: string;
    name: UserName,
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    contactNumber: string; // we want to access 0
    emergencyContactNumber: string; // we want to access 0
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImage?: string;
    isActive: "active" | "inactive"
}