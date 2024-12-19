export interface Resume {
    name?: string;
    bio?: string;
    experience: Experience[];
    education: Study[];
    skills: string[];
}

export interface Experience {
    position: string;
    company: string;
    startDate?: string;
    endDate?: string;
    description: string;
    skills?: [];
}

export interface Study {
    title: string;
    institution: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}