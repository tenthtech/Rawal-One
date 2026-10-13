import type { CivicReference } from "@/data/rawalpindi/sources";

export type HospitalRecord = CivicReference & {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  website?: string;
  phone?: string;
  tel?: string;
};

export type EmergencyService = CivicReference & {
  id: string;
  title: string;
  number: string;
  tel: string;
  description: string;
};

const checked = "2026-10-13";
const hospitalDescription =
  "Listed among the teaching and specialized hospitals in the Punjab health department’s tertiary-care directory.";

export const hospitals: readonly HospitalRecord[] = [
  {
    id: "holy-family-hospital",
    title: "Holy Family Hospital",
    description: hospitalDescription,
    category: "Tertiary-care hospital",
    location: "Rawalpindi",
    website: "https://health.punjab.gov.pk/TertiaryHospitals.aspx",
    sourceIds: ["punjab-tertiary"],
    geographicScope: "Hospital listed in Rawalpindi in the Punjab SHC&ME directory",
    lastVerified: checked,
  },
  {
    id: "benazir-bhutto-hospital",
    title: "Benazir Bhutto Hospital",
    description: hospitalDescription,
    category: "Tertiary-care hospital",
    location: "Rawalpindi",
    website: "https://health.punjab.gov.pk/TertiaryHospitals.aspx",
    sourceIds: ["punjab-tertiary"],
    geographicScope: "Hospital listed in Rawalpindi in the Punjab SHC&ME directory",
    lastVerified: checked,
  },
  {
    id: "rawalpindi-teaching-hospital",
    title: "Rawalpindi Teaching Hospital",
    description: hospitalDescription,
    category: "Tertiary-care hospital",
    location: "Rawalpindi",
    website: "https://health.punjab.gov.pk/TertiaryHospitals.aspx",
    sourceIds: ["punjab-tertiary"],
    geographicScope: "Hospital listed in Rawalpindi in the Punjab SHC&ME directory",
    lastVerified: checked,
  },
  {
    id: "rawalpindi-institute-of-cardiology",
    title: "Rawalpindi Institute of Cardiology",
    description:
      "Specialist institution for the prevention, diagnosis and treatment of cardiovascular diseases.",
    category: "Specialist cardiovascular hospital",
    location: "Rawalpindi, Punjab, Pakistan",
    website: "https://ric.gop.pk/",
    phone: "051-9281111",
    tel: "0519281111",
    sourceIds: ["punjab-tertiary", "ric-about", "ric-contact"],
    geographicScope: "Rawalpindi Institute of Cardiology",
    lastVerified: checked,
  },
];

export const emergencyServices: readonly EmergencyService[] = [
  {
    id: "rescue-1122",
    title: "Rescue 1122",
    number: "1122",
    tel: "1122",
    description:
      "Punjab Emergency Services Department: medical emergencies, road crashes, fire, rescue and flood or water emergencies.",
    sourceIds: ["rescue-number", "rescue-remit"],
    geographicScope: "Punjab Emergency Service",
    lastVerified: checked,
  },
  {
    id: "police-emergency",
    title: "Police emergency",
    number: "15",
    tel: "15",
    description: "Emergency contact for Punjab Police.",
    sourceIds: ["police-emergency"],
    geographicScope: "Punjab Police emergency service",
    lastVerified: checked,
  },
];
