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

const projectsData = [
  {
    id: 1,
    name: 'Website Redesign',
    status: 'In Progress',
    deadline: '2024-04-15',
    team: 'Frontend',
  },
  {
    id: 2,
    name: 'Mobile App',
    status: 'Planning',
    deadline: '2024-05-01',
    team: 'Mobile',
  },
  {
    id: 3,
    name: 'API Integration',
    status: 'Completed',
    deadline: '2024-03-30',
    team: 'Backend',
  },
];

const inventoryData = [
  {
    id: 1,
    item: 'Laptop',
    quantity: 25,
    status: 'In Stock',
    category: 'Electronics',
  },
  {
    id: 2,
    item: 'Office Chairs',
    quantity: 15,
    status: 'Low Stock',
    category: 'Furniture',
  },
  {
    id: 3,
    item: 'Monitors',
    quantity: 30,
    status: 'In Stock',
    category: 'Electronics',
  },
];

type Section = 'team' | 'projects' | 'inventory' | 'calendar' | 'settings';

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeSection, setActiveSection] = useState<Section>('team');

  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<{ date: Date; text: string }[]>([]);
  const [noteText, setNoteText] = useState('');

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
                  {teamData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === 'Active' ? 'default' : 'secondary'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case 'projects':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectsData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.team}</TableCell>
                      <TableCell>{item.deadline}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === 'Completed'
                              ? 'default'
                              : item.status === 'In Progress'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case 'inventory':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === 'In Stock' ? 'default' : 'secondary'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case 'calendar':
        return (
          <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Calendar</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
        <CardContent className="flex justify-center">
          <Button onClick={() => setShowModal(true)}>
            Add Note
          </Button>
        </CardContent>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note, index) => (
          <Card key={index} className="p-4">
            <CardTitle className="text-lg font-medium">
              {note.date.toLocaleDateString()}
            </CardTitle>
            <p>{note.text}</p>
          </Card>
            ))}
          </div>
        </CardContent>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
          <h2 className="text-xl font-bold mb-4">Add Note</h2>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
            if (date && noteText) {
              setNotes([...notes, { date, text: noteText }]);
              setNoteText('');
              setShowModal(false);
            } else {
              alert('Please select a date and enter a note.');
            }
              }}
            >
              Save
            </Button>
          </div>
            </div>
          </div>
        )}
          </Card>
        );

      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">General Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your general preferences and account settings.
                  </p>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your notification preferences.
                  </p>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your security settings and preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

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