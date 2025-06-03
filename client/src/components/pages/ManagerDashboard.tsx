import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import TeamOverview from '../Manager/TeamOverview';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Engineer {
  id: string;
  name: string;
  skills: string[];
  seniority: string;
  maxCapacity: number;
}

const ManagerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [engineers, setEngineers] = useState<Engineer[]>([]);

  useEffect(() => {
    if (user?.role !== 'manager') return;

    const fetchEngineers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/engineers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEngineers(response.data);
      } catch (error) {
        console.error('Failed to fetch engineers:', error);
      }
    };

    fetchEngineers();
  }, [user]);

  if (user?.role !== 'manager') {
    return <div className="p-4 text-red-500">Access denied. Manager role required.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Team Overview</TabsTrigger>
          <TabsTrigger value="create-project">Create Project</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <TeamOverview engineers={engineers} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create-project">
          <Card>
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Project creation form to be implemented.</p>
              {/* Placeholder until ProjectForm is implemented */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagerDashboard;