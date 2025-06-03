import { Request, Response } from 'express';
import User from '../models/User';
import Assignment from '../models/Assignment';

export const getEngineers = async (req: Request, res: Response) => {
  try {
    const engineers = await User.find({ role: 'engineer' }).select('-password');
    res.json(engineers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getEngineerCapacity = async (req: Request, res: Response) => {
  try {
    const engineerId = req.params.id;
    const engineer = await User.findById(engineerId);
    if (!engineer || engineer.role !== 'engineer') {
      return res.status(404).json({ error: 'Engineer not found' });
    }

    const activeAssignments = await Assignment.find({
      engineerId,
      endDate: { $gte: new Date() },
    });

    const totalAllocated = activeAssignments.reduce((sum, a) => sum + a.allocationPercentage, 0);

    // Check if maxCapacity is defined
    if (engineer.maxCapacity === undefined) {
      return res.status(400).json({ error: 'Engineer maxCapacity is not defined' });
    }

    const availableCapacity = engineer.maxCapacity - totalAllocated;

    res.json({ engineer, availableCapacity });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};