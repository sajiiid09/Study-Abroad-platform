// src/scripts/seed.js

require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const Course = require('../models/Course');
const Destination = require('../models/Destination');
const University = require('../models/University');

// -------------------------------------------
// 1. Data from frontend courses (Courses.tsx)
// -------------------------------------------

const coursesData = [
  {
    title: "IELTS Preparation Course",
    category: "Language",
    duration: "8 weeks",
    studentCount: 2500,
    rating: 4.9,
    price: 299,
    thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    description: "Comprehensive IELTS preparation with expert instructors and practice tests.",
  },
  {
    title: "GRE Complete Prep",
    category: "Test Prep",
    duration: "12 weeks",
    studentCount: 1200,
    rating: 4.7,
    price: 449,
    thumbnailUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
    description: "Intensive GRE preparation covering Verbal, Quantitative, and Analytical Writing.",
  },
  {
    title: "Academic Writing Mastery",
    category: "Academic",
    duration: "6 weeks",
    studentCount: 900,
    rating: 4.6,
    price: 249,
    thumbnailUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    description: "Sharpen your research and academic writing skills with practical assignments and feedback.",
  },
  {
    title: "Counseling for Study Abroad",
    category: "Counseling",
    duration: "4 weeks",
    studentCount: 650,
    rating: 4.8,
    price: 199,
    thumbnailUrl: "https://images.unsplash.com/photo-1516383607781-913a19294fd1?w=800&q=80",
    description: "Personalized counseling sessions to help you navigate applications, visas, and scholarships.",
  },
  {
    title: "TOEFL Booster Program",
    category: "Language",
    duration: "10 weeks",
    studentCount: 1800,
    rating: 4.7,
    price: 329,
    thumbnailUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    description: "Boost your TOEFL scores with targeted practice and expert strategies.",
  },
  {
    title: "Data Analytics Foundations",
    category: "Academic",
    duration: "8 weeks",
    studentCount: 1400,
    rating: 4.5,
    price: 399,
    thumbnailUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    description: "Learn core analytics concepts and tools to strengthen your university applications and research projects.",
  },
];

// -------------------------------------------
// 2. Data for Study Abroad Destinations
//    (from your DestinationsSection)
// -------------------------------------------

const destinationsData = [
  {
    name: "United Kingdom",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    universityCount: 150,
    costRange: "$15,000 - $35,000",
    duration: "3-4 years",
    workPermitRules: "20 hrs/week",
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    highlights: [
      "World-renowned universities",
      "Post-study work visa",
      "Rich cultural heritage"
    ],
    universitiesList: [
      { name: "University of Oxford", ranking: 3, location: "Oxford" },
      { name: "University of Cambridge", ranking: 2, location: "Cambridge" },
      { name: "Imperial College London", ranking: 6, location: "London" }
    ]
  },
  {
    name: "United States",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    universityCount: 200,
    costRange: "$20,000 - $50,000",
    duration: "4 years",
    workPermitRules: "On-campus work permitted",
    imageUrl: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=80",
    highlights: [
      "Ivy League excellence",
      "Diverse campus life",
      "Strong research opportunities"
    ],
    universitiesList: [
      { name: "Harvard University", ranking: 1, location: "Cambridge, MA" },
      { name: "Stanford University", ranking: 3, location: "Stanford, CA" },
      { name: "Massachusetts Institute of Technology", ranking: 5, location: "Cambridge, MA" },
    ]
  },
  {
    name: "Canada",
    flag: "\uD83C\uDDE8\uD83C\uDDE6",
    universityCount: 120,
    costRange: "$18,000 - $32,000",
    duration: "3-4 years",
    workPermitRules: "20 hrs/week during studies",
    imageUrl: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&q=80",
    highlights: [
      "Affordable tuition",
      "Post-graduation work permits",
      "Safe and welcoming environment"
    ],
    universitiesList: [
      { name: "University of Toronto", ranking: 18, location: "Toronto" },
      { name: "University of British Columbia", ranking: 40, location: "Vancouver" },
      { name: "McGill University", ranking: 30, location: "Montreal" },
    ]
  },
  {
    name: "Australia",
    flag: "\uD83C\uDDE6\uD83C\uDDFA",
    universityCount: 110,
    costRange: "$20,000 - $45,000",
    duration: "3-4 years",
    workPermitRules: "20 hrs/week during term",
    imageUrl: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?w=800&q=80",
    highlights: [
      "High graduate employability",
      "Relaxed lifestyle",
      "STEM and healthcare strengths"
    ],
    universitiesList: [
      { name: "University of Melbourne", ranking: 33, location: "Melbourne" },
      { name: "Australian National University", ranking: 34, location: "Canberra" },
      { name: "University of Sydney", ranking: 41, location: "Sydney" },
    ]
  },
];

// -------------------------------------------
// Seeding Script
// -------------------------------------------

const seedDatabase = async () => {
  try {
    // Connect
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB Connected for Seeding");

    // Clear old data
    await Course.deleteMany({});
    await Destination.deleteMany({});
    await University.deleteMany({});

    // Seed Courses
    await Course.insertMany(coursesData);
    console.log("Courses Seeded");

    // Seed Destinations and their Universities
    for (const destData of destinationsData) {
      const { universitiesList, ...destinationInfo } = destData;

      // Create Destination
      const newDest = await Destination.create(destinationInfo);

      // Create Universities linked to this Destination
      const universitiesWithId = universitiesList.map(uni => ({
        ...uni,
        destinationId: newDest._id
      }));

      await University.insertMany(universitiesWithId);
    }

    console.log("Destinations and Universities Seeded");
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedDatabase();
