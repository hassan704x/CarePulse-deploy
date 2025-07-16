
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));


export interface User {
  $id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Patient {
  $id: string;
  name: string;
  age: string;
  gender: string;
  userId: string;
}


const mockUsers: User[] = [];
const mockPatients: Patient[] = [];


export const createUser = async (
  user: Omit<User, "$id">
): Promise<User> => {
  await delay(500);

  const existingUser = mockUsers.find((u) => u.email === user.email);
  if (existingUser) return existingUser;

  const newUser: User = {
    $id: `user_${Math.random().toString(36).substring(2, 10)}`,
    ...user,
  };

  mockUsers.push(newUser);
  return newUser;
};


export const getUser = async (userId: string): Promise<User | undefined> => {
  await delay(300);
  return mockUsers.find((u) => u.$id === userId);
};


export const registerPatient = async (data: {
  name: string;
  age: string;
  gender: string;
  userId: string;
}): Promise<Patient> => {
  await delay(500);

  const newPatient: Patient = {
    $id: `patient_${Math.random().toString(36).substring(2, 10)}`,
    ...data,
  };

  mockPatients.push(newPatient);
  return newPatient;
};


export const getPatient = async (
  userId: string
): Promise<Patient | undefined> => {
  await delay(300);
  return mockPatients.find((p) => p.userId === userId);
};
