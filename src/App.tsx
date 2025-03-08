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

const initialTeamData = [
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
  const [teamMembers, setTeamMembers] = useState(initialTeamData);

  const handleStatusChange = (id: number, newStatus: string) => {
    setTeamMembers((prevTeamMembers) =>
      prevTeamMembers.map((member) =>
        member.id === id ? { ...member, status: newStatus } : member
      )
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<{ date: Date; text: string }[]>([]);
  const [noteText, setNoteText] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const filteredTeamData = teamData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estado para la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Nuevo estado para el miembro seleccionado (modal)
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamData)[0] | null
  >(null);

  // Filtrado para la sección de Team Members
  const filteredTeamData = teamData.filter((member) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(lowerSearch) ||
      member.email.toLowerCase().includes(lowerSearch) ||
      member.role.toLowerCase().includes(lowerSearch)
    );
  });


  const renderContent = () => {
    switch (activeSection) {
      case 'team':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Barra de búsqueda */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name, email, or role"
                  className="border rounded p-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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


                  {filteredTeamData.map((item: typeof teamData[0]) => (

                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>

                  {filteredTeamData.map((item) => (
                    // Se agrega onClick para abrir el modal con detalles
                    <TableRow
                      key={item.id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedMember(item)}
                    >
                      <TableCell className="font-medium">
                        {item.name}
                      </TableCell>

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
                            item.status === 'In Stock'
                              ? 'default'
                              : 'secondary'
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
          <Button onClick={() => setShowModal(true)}>Add Note</Button>
        </CardContent>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note, index) => (
          <Card key={index} className="p-4">
            <CardTitle className="text-lg font-medium">
              {note.date.toLocaleDateString()}
            </CardTitle>
            <p>{note.text}</p>
            <Button
              variant="ghost"
              onClick={() => {
            const newNotes = notes.filter((_, i) => i !== index);
            setNotes(newNotes);
              }}
            >
              Delete
            </Button>
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

      {/* Modal para ver detalles del miembro (nueva funcionalidad) */}
      {selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Detalles del Miembro</h2>
            <p>
              <strong>Nombre:</strong> {selectedMember.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedMember.email}
            </p>
            <p>
              <strong>Rol:</strong> {selectedMember.role}
            </p>
            <p>
              <strong>Status:</strong> {selectedMember.status}
            </p>
            <div className="mt-4 text-right">
              <Button onClick={() => setSelectedMember(null)}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
