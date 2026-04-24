export type Role = "DOCTOR" | "PATIENT" | "ADMIN";

export interface PatientSummary {
  id: string;
  fullName: string;
  dateOfBirth: string | null;
  primaryCondition: string | null;
  assignedDoctorId: string;
}

export interface AppointmentSummary {
  id: string;
  patientId: string;
  scheduledAt: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
}
