export interface Resume {
    name?: string;
    bio?: string;
    experience: Experience[];
}

export interface Experience {
    position: string;
    company: string;
    startDate?: string;
    endDate?: string;
    description: string;
    skills?: [];
}