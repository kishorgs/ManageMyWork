import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import SkillTags from '../Common/SkillTags';

interface Assignment {
  id: string;
  projectId: string;
  projectName: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
}

const EngineerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    if (user?.role !== 'engineer') return;

    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assignments', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        // Filter assignments for the current user
        const userAssignments = response.data.filter((assignment: any) => assignment.engineerId === user.id);
        // Enrich assignments with project names
        const enrichedAssignments = await Promise.all(
          userAssignments.map(async (assignment: any) => {
            const projectResponse = await axios.get(
              `http://localhost:5000/api/projects/${assignment.projectId}`,
              { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return {
              id: assignment._id,
              projectId: assignment.projectId,
              projectName: projectResponse.data.name,
              allocationPercentage: assignment.allocationPercentage,
              startDate: new Date(assignment.startDate).toLocaleDateString(),
              endDate: new Date(assignment.endDate).toLocaleDateString(),
              role: assignment.role,
            };
          })
        );
        setAssignments(enrichedAssignments);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      }
    };

    fetchAssignments();
  }, [user]);

  if (user?.role !== 'engineer') {
    return <div className="p-4 text-red-500">Access denied. Engineer role required.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Engineer Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>My Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <p>No assignments found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Allocation</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>{assignment.projectName}</TableCell>
                    <TableCell>{assignment.role}</TableCell>
                    <TableCell>{assignment.allocationPercentage}%</TableCell>
                    <TableCell>{assignment.startDate}</TableCell>
                    <TableCell>{assignment.endDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          {/* <p><strong>Skills:</strong> <SkillTags skills={user?.skills || []} /></p>
          <p><strong>Seniority:</strong> {user?.seniority || 'N/A'}</p>
          <p><strong>Max Capacity:</strong> {user?.maxCapacity || 'N/A'}%</p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default EngineerDashboard;