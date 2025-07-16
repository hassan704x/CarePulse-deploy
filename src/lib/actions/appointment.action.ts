"use server";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Define the Appointment type
export interface Appointment {
  $id?: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  schedule: Date;
  status?: "pending" | "scheduled" | "cancelled";
  createdAt?: string;
}

// In-memory storage for demo purposes
let fakeAppointments: Appointment[] = [];

export const createAppointment = async (
  appointment: Omit<Appointment, "$id" | "status" | "createdAt">
): Promise<Appointment> => {
  await delay(500);

  const newAppointment: Appointment = {
    ...appointment,
    $id: Math.random().toString(36).substring(2, 9),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  fakeAppointments.push(newAppointment);
  return newAppointment;
};

export const getAppointment = async (
  appointmentId: string
): Promise<Appointment | null> => {
  await delay(300);
  return fakeAppointments.find((a) => a.$id === appointmentId) || null;
};

export const getRecentAppointmentList = async () => {
  await delay(300);

  const scheduledCount = fakeAppointments.filter(
    (a) => a.status === "scheduled"
  ).length;
  const pendingCount = fakeAppointments.filter(
    (a) => a.status === "pending"
  ).length;
  const cancelledCount = fakeAppointments.filter(
    (a) => a.status === "cancelled"
  ).length;

  return {
    totalCount: fakeAppointments.length,
    scheduledCount,
    pendingCount,
    cancelledCount,
    documents: fakeAppointments,
  };
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  type,
}: {
  appointmentId: string;
  appointment: Partial<Appointment>;
  type: "cancel" | "schedule";
}): Promise<Appointment | undefined> => {
  await delay(500);

  fakeAppointments = fakeAppointments.map((a) =>
    a.$id === appointmentId
      ? {
          ...a,
          ...appointment,
          status: type === "cancel" ? "cancelled" : "scheduled",
        }
      : a
  );

  return fakeAppointments.find((a) => a.$id === appointmentId);
};
