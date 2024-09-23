import { baseURL } from "@/lib/utils";
import type {Metadata} from 'next';


/* Prefix */
const P = 'PumpScreener';

export const rootMetadata: Metadata = {
  title: `${P}`,
  description:
    'Welcome to PumpScreener',
  bookmarks: `${baseURL}`,
};

export const loginMetadata: Metadata = {
  title: `Account Login | ${P}`,
  description: 'Login Page',
  bookmarks: `${baseURL}/login`,
};

export const logoutMetadata: Metadata = {
  title: `Account Logout | ${P}`,
  description: 'Logout Page',
  bookmarks: `${baseURL}/logout`,
};
