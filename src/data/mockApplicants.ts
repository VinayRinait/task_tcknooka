import { faker } from '@faker-js/faker';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  program: string;
  status: 'pending' | 'verified' | 'rejected';
  applicationDate: string;
  lastUpdated: string;
}

const programs = [
  'Computer Science',
  'Business Administration',
  'Engineering',
  'Medicine',
  'Law',
  'Psychology',
  'Architecture',
  'Economics',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Political Science',
  'International Relations',
  'Environmental Science',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Marketing',
  'Finance'
];

const statuses: ('pending' | 'verified' | 'rejected')[] = ['pending', 'verified', 'rejected'];

// Generate 200 mock applicants
export const mockApplicants: Applicant[] = Array.from({ length: 200 }, (_, index) => {
  const applicationDate = faker.date.past({ years: 1 }).toISOString();
  const lastUpdated = faker.date.between({ 
    from: applicationDate, 
    to: new Date().toISOString() 
  }).toISOString();

  return {
    id: (index + 1).toString(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    program: faker.helpers.arrayElement(programs),
    status: faker.helpers.arrayElement(statuses),
    applicationDate,
    lastUpdated
  };
}); 