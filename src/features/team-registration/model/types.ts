export interface TeamMember {
  fullName: string;
  group: string;
  role: string;
}

export interface TeamRegistrationFormData {
  teamName: string;
  captainName: string;
  captainGroup: string;
  email: string;
  phone: string;
  projectLink: string;
  teamMembers: TeamMember[];
  consent: boolean;
}
