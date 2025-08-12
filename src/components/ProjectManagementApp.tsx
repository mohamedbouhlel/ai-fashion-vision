import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Settings, BarChart3, Brain, Users, CheckSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import des composants IA
import { PlanningAssistant } from './ai/PlanningAssistant';
import { RiskAnalyzer } from './ai/RiskAnalyzer';
import { TaskSuggestions } from './ai/TaskSuggestions';
import { AIDashboard } from './ai/AIDashboard';

// Import des types
import { Project, Task, TeamMember, AIInsight } from '@/types/project';

// Données de démonstration
const DEMO_PROJECT: Project = {
  id: 'demo-project-1',
  name: 'Application E-commerce Mobile',
  description: 'Développement d\'une application mobile complète pour la vente en ligne avec paiement intégré et gestion des stocks.',
  startDate: '2024-01-15',
  endDate: '2024-06-30',
  status: 'active',
  priority: 'high',
  progress: 68,
  estimatedHours: 2400,
  actualHours: 1632,
  budget: 150000,
  teamSize: 8,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const DEMO_TASKS: Task[] = [
  {
    id: 'task-1',
    projectId: 'demo-project-1',
    title: 'Conception de l\'architecture API REST',
    description: 'Définir l\'architecture complète de l\'API backend avec authentification JWT et gestion des rôles.',
    status: 'completed',
    priority: 'high',
    assigneeId: 'member-1',
    estimatedHours: 40,
    actualHours: 35,
    startDate: '2024-01-15',
    dueDate: '2024-01-25',
    dependencies: [],
    tags: ['backend', 'architecture'],
    progress: 100,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-25T17:00:00Z'
  },
  {
    id: 'task-2',
    projectId: 'demo-project-1',
    title: 'Développement du système d\'authentification',
    description: 'Implémentation complète du système de login/logout avec gestion des sessions et récupération de mot de passe.',
    status: 'completed',
    priority: 'critical',
    assigneeId: 'member-2',
    estimatedHours: 60,
    actualHours: 72,
    startDate: '2024-01-26',
    dueDate: '2024-02-10',
    dependencies: ['task-1'],
    tags: ['backend', 'sécurité'],
    progress: 100,
    createdAt: '2024-01-26T09:00:00Z',
    updatedAt: '2024-02-10T18:00:00Z'
  },
  {
    id: 'task-3',
    projectId: 'demo-project-1',
    title: 'Interface utilisateur du catalogue produits',
    description: 'Création de l\'interface mobile pour l\'affichage des produits avec filtres et recherche avancée.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'member-3',
    estimatedHours: 80,
    actualHours: 45,
    startDate: '2024-02-01',
    dueDate: '2024-02-20',
    dependencies: ['task-1'],
    tags: ['frontend', 'ui/ux'],
    progress: 75,
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-18T16:00:00Z'
  },
  {
    id: 'task-4',
    projectId: 'demo-project-1',
    title: 'Intégration du système de paiement',
    description: 'Intégration avec Stripe et PayPal pour le traitement des paiements sécurisés.',
    status: 'in_progress',
    priority: 'critical',
    assigneeId: 'member-1',
    estimatedHours: 100,
    actualHours: 60,
    startDate: '2024-02-15',
    dueDate: '2024-03-05',
    dependencies: ['task-2'],
    tags: ['backend', 'paiement'],
    progress: 45,
    createdAt: '2024-02-15T09:00:00Z',
    updatedAt: '2024-03-01T14:00:00Z'
  },
  {
    id: 'task-5',
    projectId: 'demo-project-1',
    title: 'Tests d\'intégration API',
    description: 'Écriture et exécution des tests automatisés pour tous les endpoints de l\'API.',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'member-4',
    estimatedHours: 50,
    actualHours: 0,
    startDate: '2024-03-01',
    dueDate: '2024-03-15',
    dependencies: ['task-4'],
    tags: ['tests', 'qualité'],
    progress: 0,
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z'
  },
  {
    id: 'task-6',
    projectId: 'demo-project-1',
    title: 'Optimisation des performances',
    description: 'Optimisation du temps de chargement et de la réactivité de l\'application mobile.',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'member-3',
    estimatedHours: 30,
    actualHours: 0,
    startDate: '2024-03-10',
    dueDate: '2024-03-20',
    dependencies: ['task-3'],
    tags: ['performance', 'optimisation'],
    progress: 0,
    riskScore: 0.3,
    createdAt: '2024-03-10T09:00:00Z',
    updatedAt: '2024-03-10T09:00:00Z'
  }
];

const DEMO_TEAM: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Alice Dubois',
    email: 'alice.dubois@email.com',
    role: 'Lead Developer',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    currentWorkload: 35,
    maxWorkload: 40,
    efficiency: 0.92
  },
  {
    id: 'member-2',
    name: 'Marc Laurent',
    email: 'marc.laurent@email.com',
    role: 'Backend Developer',
    skills: ['Python', 'Django', 'Docker', 'Redis'],
    currentWorkload: 40,
    maxWorkload: 40,
    efficiency: 0.88
  },
  {
    id: 'member-3',
    name: 'Sophie Chen',
    email: 'sophie.chen@email.com',
    role: 'Frontend Developer',
    skills: ['React Native', 'TypeScript', 'Redux', 'Jest'],
    currentWorkload: 32,
    maxWorkload: 35,
    efficiency: 0.95
  },
  {
    id: 'member-4',
    name: 'Pierre Martin',
    email: 'pierre.martin@email.com',
    role: 'QA Engineer',
    skills: ['Selenium', 'Jest', 'Cypress', 'Postman'],
    currentWorkload: 30,
    maxWorkload: 35,
    efficiency: 0.90
  }
];

export const ProjectManagementApp: React.FC = () => {
  const [project, setProject] = useState<Project>(DEMO_PROJECT);
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [team, setTeam] = useState<TeamMember[]>(DEMO_TEAM);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Gestion des tâches
  const handleTaskAdd = (taskTitle: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      projectId: project.id,
      title: taskTitle,
      description: 'Description à compléter',
      status: 'todo',
      priority: 'medium',
      estimatedHours: 8,
      actualHours: 0,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dependencies: [],
      tags: [],
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Tâche ajoutée",
      description: `"${taskTitle}" a été ajoutée au projet.`,
    });
  };

  const handleTasksOptimized = (optimizedTasks: Task[]) => {
    setTasks(optimizedTasks);
    toast({
      title: "Planning optimisé",
      description: "Le planning a été optimisé par l'IA.",
    });
  };

  const handleInsightAction = (insight: AIInsight) => {
    toast({
      title: "Action en cours",
      description: `Traitement de : ${insight.title}`,
    });
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      handleTaskAdd(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête du projet */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <p className="text-muted-foreground mt-1">{project.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
                <Badge variant={project.priority === 'high' ? 'destructive' : 'default'}>
                  {project.priority}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Période</p>
                <p className="font-medium">
                  {new Date(project.startDate).toLocaleDateString('fr-FR')} - {new Date(project.endDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-medium">€{project.budget?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Équipe</p>
                <p className="font-medium">{team.length} membres</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avancement</p>
                <p className="font-medium">{project.progress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation par onglets */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Planification IA
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Analyse Risques
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Tâches
            </TabsTrigger>
          </TabsList>

          {/* Tableau de bord IA */}
          <TabsContent value="dashboard">
            <AIDashboard project={project} tasks={tasks} />
          </TabsContent>

          {/* Assistant de planification */}
          <TabsContent value="planning">
            <PlanningAssistant 
              project={project}
              tasks={tasks}
              team={team}
              onTasksOptimized={handleTasksOptimized}
            />
          </TabsContent>

          {/* Analyse des risques */}
          <TabsContent value="risks">
            <RiskAnalyzer 
              project={project}
              tasks={tasks}
              onInsightAction={handleInsightAction}
            />
          </TabsContent>

          {/* Suggestions de tâches */}
          <TabsContent value="suggestions">
            <TaskSuggestions 
              project={project}
              tasks={tasks}
              onTaskAdd={handleTaskAdd}
            />
          </TabsContent>

          {/* Liste des tâches */}
          <TabsContent value="tasks">
            <div className="space-y-4">
              {/* Ajout rapide de tâche */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Ajouter une tâche
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Titre de la nouvelle tâche..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                      className="flex-1"
                    />
                    <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
                      Ajouter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des tâches */}
              <Card>
                <CardHeader>
                  <CardTitle>Tâches du projet ({tasks.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <Card key={task.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{task.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={
                                  task.status === 'completed' ? 'default' :
                                  task.status === 'in_progress' ? 'secondary' : 'outline'
                                }>
                                  {task.status}
                                </Badge>
                                <Badge variant={
                                  task.priority === 'critical' ? 'destructive' :
                                  task.priority === 'high' ? 'default' : 'secondary'
                                }>
                                  {task.priority}
                                </Badge>
                                {task.assigneeId && (
                                  <span className="text-xs text-muted-foreground">
                                    Assigné à: {team.find(m => m.id === task.assigneeId)?.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{task.progress}%</p>
                              <p className="text-xs text-muted-foreground">
                                {task.estimatedHours}h estimé
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};