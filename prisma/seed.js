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
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  // Helper to delete all documents from a collection
  const deleteCollection = async (collectionName) => {
    try {
      await prisma.$runCommandRaw({
        delete: collectionName,
        deletes: [{ q: {}, limit: 0 }],
      });
    } catch (error) {
      if (error.code !== 26 && !error.message?.includes('ns not found')) {
        console.warn(`Warning: Could not clear collection ${collectionName}: ${error.message}`);
      }
    }
  };

  // Helper to generate ObjectId
  const newId = () => crypto.randomBytes(12).toString('hex');
  const isObjectId = (str) => /^[0-9a-fA-F]{24}$/.test(str);

  // Helper to convert data to EJSON-compatible format for runCommandRaw
  const toEJSON = (obj) => {
    if (obj instanceof Date) return { $date: obj.toISOString() };
    if (Array.isArray(obj)) return obj.map(toEJSON);
    if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        if (key === 'id') continue; // ignore id if present in data
        const val = obj[key];
        if (typeof val === 'string' && isObjectId(val)) {
          // Assume 24-char hex strings are ObjectIds (for foreign keys)
          newObj[key] = { $oid: val };
        } else {
          newObj[key] = toEJSON(val);
        }
      }
      return newObj;
    }
    return obj;
  };

  // Helper to insert a document
  const insert = async (collection, data) => {
    const id = newId();
    const doc = {
      _id: { $oid: id },
      ...toEJSON(data),
      createdAt: { $date: new Date().toISOString() },
      updatedAt: { $date: new Date().toISOString() },
    };

    await prisma.$runCommandRaw({
      insert: collection,
      documents: [doc],
    });

    // Return data with id so we can use it for relations
    return { ...data, id };
  };

  // Clear data
  await deleteCollection('ConsultationBooking');
  await deleteCollection('Enrollment');
  await deleteCollection('Application');
  await deleteCollection('University');
  await deleteCollection('Destination');
  await deleteCollection('Course');
  await deleteCollection('User');

  const student = await insert('User', {
    name: 'Alice Student',
    email: 'alice@example.com',
    password: 'hashed_password_demo',
    role: UserRole.STUDENT,
  });

  await insert('User', {
    name: 'Bob Admin',
    email: 'admin@example.com',
    password: 'hashed_admin_demo',
    role: UserRole.ADMIN,
  });

  const canada = await insert('Destination', {
    name: 'Canada',
    imageUrl: 'https://example.com/images/canada.jpg',
    shortDescription: 'Popular for co-op programs and post-study work permits.',
    universityCount: 20,
    costRange: '18,000–28,000 CAD/year',
    workPermitRules: 'Up to 3 years post-graduation work permit for eligible programs.',
  });

  const uk = await insert('Destination', {
    name: 'United Kingdom',
    imageUrl: 'https://example.com/images/uk.jpg',
    shortDescription: 'Renowned universities and diverse culture.',
    universityCount: 25,
    costRange: '16,000–24,000 GBP/year',
    workPermitRules: 'Graduate Route allows up to 2 years stay for eligible graduates.',
  });

  const australia = await insert('Destination', {
    name: 'Australia',
    imageUrl: 'https://example.com/images/australia.jpg',
    shortDescription: 'Strong research focus and vibrant student life.',
    universityCount: 30,
    costRange: '20,000–30,000 AUD/year',
    workPermitRules: 'Temporary Graduate visa available for eligible courses.',
  });

  const torontoUni = await insert('University', {
    name: 'University of Toronto',
    location: 'Toronto, Canada',
    ranking: 21,
    destinationId: canada.id,
  });

  const mcgill = await insert('University', {
    name: 'McGill University',
    location: 'Montreal, Canada',
    ranking: 30,
    destinationId: canada.id,
  });

  const oxford = await insert('University', {
    name: 'University of Oxford',
    location: 'Oxford, United Kingdom',
    ranking: 1,
    destinationId: uk.id,
  });

  const kings = await insert('University', {
    name: "King's College London",
    location: 'London, United Kingdom',
    ranking: 37,
    destinationId: uk.id,
  });

  const sydney = await insert('University', {
    name: 'University of Sydney',
    location: 'Sydney, Australia',
    ranking: 41,
    destinationId: australia.id,
  });

  const melbourne = await insert('University', {
    name: 'University of Melbourne',
    location: 'Melbourne, Australia',
    ranking: 33,
    destinationId: australia.id,
  });

  const ieltsCourse = await insert('Course', {
    title: 'IELTS Mastery',
    description: 'Comprehensive prep for IELTS Academic.',
    price: 199.99,
    category: CourseCategory.IELTS,
    thumbnailUrl: 'https://example.com/images/ielts.jpg',
    instructorName: 'Sarah Williams',
    rating: 4.8,
  });

  const toeflCourse = await insert('Course', {
    title: 'TOEFL Essentials',
    description: 'Targeted strategies for high TOEFL scores.',
    price: 179.99,
    category: CourseCategory.TOEFL,
    thumbnailUrl: 'https://example.com/images/toefl.jpg',
    instructorName: 'James Lee',
    rating: 4.6,
  });

  const greCourse = await insert('Course', {
    title: 'GRE Quant Bootcamp',
    description: 'Intensive quantitative reasoning practice.',
    price: 249.99,
    category: CourseCategory.GRE,
    thumbnailUrl: 'https://example.com/images/gre.jpg',
    instructorName: 'Priya Nair',
    rating: 4.7,
  });

  const spokenEnglish = await insert('Course', {
    title: 'Spoken English for Professionals',
    description: 'Enhance fluency and workplace communication.',
    price: 129.99,
    category: CourseCategory.SPOKEN_ENGLISH,
    thumbnailUrl: 'https://example.com/images/spoken-english.jpg',
    instructorName: 'Michael Chen',
    rating: 4.5,
  });

  const applicationsData = [
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
  ];

  for (const app of applicationsData) {
    await insert('Application', app);
  }

  const enrollmentsData = [
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
  ];

  for (const enrollment of enrollmentsData) {
    await insert('Enrollment', enrollment);
  }

  const consultationsData = [
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
  ];

  for (const consultation of consultationsData) {
    await insert('ConsultationBooking', consultation);
  }

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
