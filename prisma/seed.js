// prisma/seed.js
const {
  PrismaClient,
  UserRole,
  CourseCategory,
  EnrollmentStatus,
  ApplicationStatus,
  ConsultationStatus,
  PaymentStatus,
} = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.consultationBooking.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.application.deleteMany();
  await prisma.university.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const student = await prisma.user.create({
    data: {
      name: 'Alice Student',
      email: 'alice@example.com',
      password: 'hashed_password_demo',
      role: UserRole.STUDENT,
    },
  });

  await prisma.user.create({
    data: {
      name: 'Bob Admin',
      email: 'admin@example.com',
      password: 'hashed_admin_demo',
      role: UserRole.ADMIN,
    },
  });

  const canada = await prisma.destination.create({
    data: {
      name: 'Canada',
      imageUrl: 'https://example.com/images/canada.jpg',
      shortDescription: 'Popular for co-op programs and post-study work permits.',
      universityCount: 20,
      costRange: '18,000–28,000 CAD/year',
      workPermitRules: 'Up to 3 years post-graduation work permit for eligible programs.',
    },
  });

  const uk = await prisma.destination.create({
    data: {
      name: 'United Kingdom',
      imageUrl: 'https://example.com/images/uk.jpg',
      shortDescription: 'Renowned universities and diverse culture.',
      universityCount: 25,
      costRange: '16,000–24,000 GBP/year',
      workPermitRules: 'Graduate Route allows up to 2 years stay for eligible graduates.',
    },
  });

  const australia = await prisma.destination.create({
    data: {
      name: 'Australia',
      imageUrl: 'https://example.com/images/australia.jpg',
      shortDescription: 'Strong research focus and vibrant student life.',
      universityCount: 30,
      costRange: '20,000–30,000 AUD/year',
      workPermitRules: 'Temporary Graduate visa available for eligible courses.',
    },
  });

  const torontoUni = await prisma.university.create({
    data: {
      name: 'University of Toronto',
      location: 'Toronto, Canada',
      ranking: 21,
      destinationId: canada.id,
    },
  });

  const mcgill = await prisma.university.create({
    data: {
      name: 'McGill University',
      location: 'Montreal, Canada',
      ranking: 30,
      destinationId: canada.id,
    },
  });

  const oxford = await prisma.university.create({
    data: {
      name: 'University of Oxford',
      location: 'Oxford, United Kingdom',
      ranking: 1,
      destinationId: uk.id,
    },
  });

  const kings = await prisma.university.create({
    data: {
      name: "King's College London",
      location: 'London, United Kingdom',
      ranking: 37,
      destinationId: uk.id,
    },
  });

  const sydney = await prisma.university.create({
    data: {
      name: 'University of Sydney',
      location: 'Sydney, Australia',
      ranking: 41,
      destinationId: australia.id,
    },
  });

  const melbourne = await prisma.university.create({
    data: {
      name: 'University of Melbourne',
      location: 'Melbourne, Australia',
      ranking: 33,
      destinationId: australia.id,
    },
  });

  const ieltsCourse = await prisma.course.create({
    data: {
      title: 'IELTS Mastery',
      description: 'Comprehensive prep for IELTS Academic.',
      price: 199.99,
      category: CourseCategory.IELTS,
      thumbnailUrl: 'https://example.com/images/ielts.jpg',
      instructorName: 'Sarah Williams',
      rating: 4.8,
    },
  });

  const toeflCourse = await prisma.course.create({
    data: {
      title: 'TOEFL Essentials',
      description: 'Targeted strategies for high TOEFL scores.',
      price: 179.99,
      category: CourseCategory.TOEFL,
      thumbnailUrl: 'https://example.com/images/toefl.jpg',
      instructorName: 'James Lee',
      rating: 4.6,
    },
  });

  const greCourse = await prisma.course.create({
    data: {
      title: 'GRE Quant Bootcamp',
      description: 'Intensive quantitative reasoning practice.',
      price: 249.99,
      category: CourseCategory.GRE,
      thumbnailUrl: 'https://example.com/images/gre.jpg',
      instructorName: 'Priya Nair',
      rating: 4.7,
    },
  });

  const spokenEnglish = await prisma.course.create({
    data: {
      title: 'Spoken English for Professionals',
      description: 'Enhance fluency and workplace communication.',
      price: 129.99,
      category: CourseCategory.SPOKEN_ENGLISH,
      thumbnailUrl: 'https://example.com/images/spoken-english.jpg',
      instructorName: 'Michael Chen',
      rating: 4.5,
    },
  });

  await prisma.application.createMany({
    data: [
      {
        userId: student.id,
        universityId: torontoUni.id,
        status: ApplicationStatus.PENDING,
        intendedIntake: 'Fall 2025',
        notes: 'Interested in Computer Science undergraduate program.',
        documents: { transcript: 'https://example.com/docs/transcript.pdf' },
      },
      {
        userId: student.id,
        universityId: oxford.id,
        status: ApplicationStatus.UNDER_REVIEW,
        intendedIntake: 'Fall 2025',
        notes: 'Pursuing MSc in Data Science.',
        documents: { recommendation: 'https://example.com/docs/reco.pdf' },
      },
    ],
  });

  await prisma.enrollment.createMany({
    data: [
      {
        userId: student.id,
        courseId: ieltsCourse.id,
        status: EnrollmentStatus.ACTIVE,
        paymentStatus: PaymentStatus.PAID,
        paymentReference: 'stripe_pi_demo_123',
      },
      {
        userId: student.id,
        courseId: greCourse.id,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentReference: 'bkash_demo_456',
      },
    ],
  });

  await prisma.consultationBooking.createMany({
    data: [
      {
        userId: student.id,
        name: 'Alice Student',
        email: 'alice@example.com',
        phone: '+1-555-1234',
        message: 'Looking for advice on Canadian universities.',
        preferredDate: new Date(),
        status: ConsultationStatus.SCHEDULED,
      },
      {
        name: 'Charlie Prospect',
        email: 'charlie@example.com',
        phone: '+44-555-9876',
        message: 'Need guidance on IELTS preparation.',
        status: ConsultationStatus.NEW,
      },
    ],
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
