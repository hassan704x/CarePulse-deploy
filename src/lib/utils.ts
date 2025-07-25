import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};


export const convertFileToUrl = (file: File) => URL.createObjectURL(file);


export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    
    month: "short", 
    day: "numeric", 
    year: "numeric", 
    hour: "numeric", 
    minute: "numeric", 
    hour12: true, 
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", 
    year: "numeric", 
    month: "2-digit", 
    day: "2-digit", 
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", 
    year: "numeric", 
    day: "numeric", 
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", 
    minute: "numeric", 
    hour12: true,
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}