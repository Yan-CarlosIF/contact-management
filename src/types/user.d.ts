export interface Contact {
  id: number;
  name: string;
  description: string | null;
  phone: string;
  email: string;
  userId: number;
  isLocked: boolean;
  avatar_url?: string | null | undefined;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: number;
  contacts: Contact[];
}
