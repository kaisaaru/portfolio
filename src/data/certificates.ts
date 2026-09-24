export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl?: string;
}

export const certificates: CertificateItem[] = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI & Stanford Online",
    date: "Aug 2026",
    image: "/certificates/coursera-mlsupervisedlearning.jpg",
    verifyUrl: "https://coursera.org/verify/GIO0B1GQZAMZ",
  },
  {
    title: "Finalist – Inovasi Adikara 2025",
    issuer: "Adikara",
    date: "2025",
    image: "/certificates/adikara2025.png",
  },
  {
    title: "Participant – Arkavidia 10.0 2026",
    issuer: "Arkavidia",
    date: "2026",
    image: "/certificates/arkavidia2026.jpg",
  },
];
