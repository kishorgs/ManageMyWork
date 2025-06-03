import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import SkillTags from '../Common/SkillTags';

interface Engineer {
  id: string;
  name: string;
  skills: string[];
  seniority: string;
  maxCapacity: number;
}

interface TeamOverviewProps {
  engineers: Engineer[];
}

const TeamOverview: React.FC<TeamOverviewProps> = ({ engineers }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Skills</TableHead>
          <TableHead>Seniority</TableHead>
          <TableHead>Max Capacity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {engineers.map((engineer) => (
          <TableRow key={engineer.id}>
            <TableCell>{engineer.name}</TableCell>
            <TableCell>
              <SkillTags skills={engineer.skills} />
            </TableCell>
            <TableCell>{engineer.seniority}</TableCell>
            <TableCell>{engineer.maxCapacity}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamOverview;