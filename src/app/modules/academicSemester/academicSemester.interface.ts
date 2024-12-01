export type TMonths =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

export type TSemesterNames = 'Autumn' | 'Summer' | 'Fall';
export type TSemesterCodes = '01' | '02' | '03';

export type TAcademicSemester = {
    name: TSemesterNames;
    year: string;
    code: TSemesterCodes;
    startMonth: TMonths;
    endMonth: TMonths;
    createdAt: Date;
    updatedAt: Date;
}

export type TAcademicSemesterNameCodeMapper = {
    [key: string]: string
}