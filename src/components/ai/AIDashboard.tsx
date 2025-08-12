import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, 
  Clock, Users, Target, DollarSign, Brain
} from 'lucide-react';
import { Project, Task, ProjectMetrics } from '@/types/project';
import { AIProjectService } from '@/services/aiService';

interface AIDashboardProps {
  project: Project;
  tasks: Task[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export const AIDashboard: React.FC<AIDashboardProps> = ({ project, tasks }) => {
  const aiService = new AIProjectService('demo-key');
  
  const metrics = useMemo(() => {
    return aiService.generateProjectMetrics(project, tasks);
  }, [project, tasks]);

  // Données pour les graphiques
  const taskStatusData = useMemo(() => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'À faire', value: statusCounts['todo'] || 0, color: COLORS[0] },
      { name: 'En cours', value: statusCounts['in_progress'] || 0, color: COLORS[1] },
      { name: 'En révision', value: statusCounts['review'] || 0, color: COLORS[2] },
      { name: 'Terminé', value: statusCounts['completed'] || 0, color: COLORS[3] }
    ];
  }, [tasks]);

  const priorityData = useMemo(() => {
    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'Critique', value: priorityCounts['critical'] || 0 },
      { name: 'Haute', value: priorityCounts['high'] || 0 },
      { name: 'Moyenne', value: priorityCounts['medium'] || 0 },
      { name: 'Basse', value: priorityCounts['low'] || 0 }
    ];
  }, [tasks]);

  const progressTrendData = useMemo(() => {
    // Simulation de données de progression sur les 7 derniers jours
    const today = new Date();
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simulation de progression basée sur les vraies données
      const completedToDate = Math.min(
        metrics.completedTasks + Math.floor(Math.random() * 3),
        metrics.totalTasks
      );
      const progressPercent = (completedToDate / metrics.totalTasks) * 100;
      
      data.push({
        date: date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
        progress: Math.max(0, progressPercent - (6 - i) * 5 + Math.random() * 10)
      });
    }
    
    return data;
  }, [metrics]);

  const workloadData = useMemo(() => {
    // Simulation de répartition de charge par jour
    const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
    return weekDays.map(day => ({
      day,
      planned: Math.floor(Math.random() * 8) + 4,
      actual: Math.floor(Math.random() * 10) + 3
    }));
  }, []);

  const getRiskColor = (score: number) => {
    if (score >= 0.7) return 'text-destructive';
    if (score >= 0.4) return 'text-warning';
    return 'text-green-600';
  };

  const getRiskBadge = (score: number) => {
    if (score >= 0.7) return { variant: 'destructive' as const, label: 'Élevé' };
    if (score >= 0.4) return { variant: 'default' as const, label: 'Moyen' };
    return { variant: 'secondary' as const, label: 'Faible' };
  };

  return (
    <div className="space-y-6">
      {/* Header avec métriques clés */}
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Tableau de Bord IA</h2>
        <Badge variant="outline">Analyse en temps réel</Badge>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avancement</p>
                <p className="text-2xl font-bold">{project.progress}%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-4 w-4 text-primary" />
              </div>
            </div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tâches restantes</p>
                <p className="text-2xl font-bold">{metrics.totalTasks - metrics.completedTasks}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sur {metrics.totalTasks} au total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risque projet</p>
                <p className={`text-2xl font-bold ${getRiskColor(metrics.riskScore)}`}>
                  {(metrics.riskScore * 100).toFixed(0)}%
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <Badge variant={getRiskBadge(metrics.riskScore).variant} className="mt-1">
              {getRiskBadge(metrics.riskScore).label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficacité équipe</p>
                <p className="text-2xl font-bold text-green-600">
                  {(metrics.teamEfficiency * 100).toFixed(0)}%
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+5% ce mois</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques analytiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition des tâches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              Répartition des tâches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {taskStatusData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div 
                    className="h-2 w-2 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tendance de progression */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Progression (7 derniers jours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={progressTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Charge de travail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Charge hebdomadaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="planned" fill="hsl(var(--muted))" name="Planifié" />
                <Bar dataKey="actual" fill="hsl(var(--primary))" name="Réel" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Analyse des priorités */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              Répartition par priorité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={priorityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={60} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Prédictions IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-600" />
            Prédictions IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Date de livraison prévue</span>
                <Badge variant="outline">
                  {(metrics.confidenceInterval * 100).toFixed(0)}% confiance
                </Badge>
              </div>
              <p className="text-lg font-bold">
                {new Date(metrics.predictedCompletionDate).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Basé sur la vélocité actuelle
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Budget prévisionnel</span>
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-lg font-bold">
                {project.budget ? `€${(metrics.budgetUtilization * project.budget).toLocaleString()}` : 'N/A'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {project.budget ? `${(metrics.budgetUtilization * 100).toFixed(1)}% du budget` : 'Budget non défini'}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Tâches en retard prévues</span>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              <p className="text-lg font-bold text-orange-600">
                {metrics.overdueTasks}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Nécessitent une attention immédiate
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};