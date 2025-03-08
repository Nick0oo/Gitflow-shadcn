import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  Calendar as CalendarIcon,
  Building2,
  Settings,
  Package,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const teamData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    role: 'Developer',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Inactive',
    role: 'Designer',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'Active',
    role: 'Manager',
  },
];

type Section = 'team' | 'projects' | 'inventory' | 'calendar' | 'settings';

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeSection, setActiveSection] = useState<Section>('team');
  const [teamMembers, setTeamMembers] = useState(teamData);

  const handleStatusChange = (id: number, newStatus: string) => {
    setTeamMembers((prevTeamMembers) =>
      prevTeamMembers.map((member) =>
        member.id === id ? { ...member, status: newStatus } : member
      )
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'team':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>
                        <Select
                          value={item.status}
                          onValueChange={(value) =>
                            handleStatusChange(item.id, value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">
                              <Badge variant="default">Active</Badge>
                            </SelectItem>
                            <SelectItem value="Inactive">
                              <Badge variant="secondary">Inactive</Badge>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      // ... (resto del código)

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <div className="space-y-2">
          <Button
            variant={activeSection === 'team' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('team')}
          >
            <Users className="mr-2 h-4 w-4" />
            Team
          </Button>
          <Button
            variant={activeSection === 'projects' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('projects')}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Projects
          </Button>
          <Button
            variant={activeSection === 'inventory' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('inventory')}
          >
            <Package className="mr-2 h-4 w-4" />
            Inventory
          </Button>
          <Button
            variant={activeSection === 'calendar' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('calendar')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button
            variant={activeSection === 'settings' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
}

export default App;