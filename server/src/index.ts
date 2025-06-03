import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import connectDB from './config/db';
// import authRoutes from './routes/authRoutes';
// import engineerRoutes from './routes/engineerRoutes';
// import projectRoutes from './routes/projectRoutes';
// import assignmentRoutes from './routes/assignmentRoutes';

dotenv.config();
const app = express();

// connectDB();

app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/engineers', engineerRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/assignments', assignmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));