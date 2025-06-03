import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Project from './models/Project';
import Assignment from './models/Assignment';
import connectDB from './config/db';

async function seed() {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Project.deleteMany({});
  await Assignment.deleteMany({});

  // Seed users
  const users = [
    {
      email: 'manager@xai.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Jane Doe',
      role: 'manager',
      department: 'Engineering',
    },
    {
      email: 'engineer1@xai.com',
      password: await bcrypt.hash('password123', 10),
      name: 'John Smith',
      role: 'engineer',
      skills: ['React', 'TypeScript'],
      seniority: 'senior',
      maxCapacity: 100,
      department: 'Engineering',
    },
    {
      email: 'engineer2@xai.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Alice Johnson',
      role: 'engineer',
      skills: ['Node.js', 'Python'],
      seniority: 'mid',
      maxCapacity: 50,
      department: 'Engineering',
    },
  ];

  const insertedUsers = await User.insertMany(users);

  // Seed projects
  const projects = [
    {
      name: 'AI Platform',
      description: 'Build AI dashboard',
      startDate: new Date(),
      endDate: new Date('2025-12-31'),
      requiredSkills: ['React', 'Node.js'],
      teamSize: 3,
      status: 'active',
      managerId: insertedUsers[0]._id,
    },
    {
      name: 'Data Pipeline',
      description: 'Data processing system',
      startDate: new Date(),
      endDate: new Date('2025-06-30'),
      requiredSkills: ['Python'],
      teamSize: 2,
      status: 'planning',
      managerId: insertedUsers[0]._id,
    },
  ];

  const insertedProjects = await Project.insertMany(projects);

  // Seed assignments
  const assignments = [
    {
      engineerId: insertedUsers[1]._id,
      projectId: insertedProjects[0]._id,
      allocationPercentage: 60,
      startDate: new Date(),
      endDate: new Date('2025-12-31'),
      role: 'Developer',
    },
    {
      engineerId: insertedUsers[2]._id,
      projectId: insertedProjects[1]._id,
      allocationPercentage: 40,
      startDate: new Date(),
      endDate: new Date('2025-06-30'),
      role: 'Developer',
    },
  ];

  await Assignment.insertMany(assignments);

  console.log('Database seeded successfully');
  mongoose.connection.close();
}

seed().catch(console.error);