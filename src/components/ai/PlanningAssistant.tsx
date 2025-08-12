import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Calendar, Users, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Project, Task, TeamMember } from '@/types/project';
import { AIProjectService } from '@/services/aiService';

interface PlanningAssistantProps {
  project: Project;
  tasks: Task[];
  team: TeamMember[];
  onTasksOptimized: (tasks: Task[]) => void;
}

export const PlanningAssistant: React.FC<PlanningAssistantProps> = ({
  project,
  tasks,
  team,
  onTasksOptimized
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState<{
    recommendations: string[];
    confidence: number;
  } | null>(null);

  const handleOptimizeSchedule = async () => {
    setIsOptimizing(true);
    try {
      // En production, utiliser la vraie clé API
      const aiService = new AIProjectService('demo-key');
      const result = await aiService.optimizeSchedule(project, tasks, team);
      setOptimization(result);
      onTasksOptimized(result.optimizedTasks);
    } catch (error) {
      console.error('Erreur optimisation:', error);
      // Simulation pour la démo
      setOptimization({
        recommendations: [
          'Réorganiser les tâches critiques en parallèle',
          'Équilibrer la charge de travail entre les membres',
          'Prioriser les tâches avec dépendances',
          'Ajuster les deadlines basées sur la vélocité équipe'
        ],
        confidence: 0.85
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const getWorkloadDistribution = () => {
    return team.map(member => {
      const memberTasks = tasks.filter(t => t.assigneeId === member.id);
      const workload = memberTasks.reduce((sum, t) => sum + t.estimatedHours, 0);
      const utilization = (workload / member.maxWorkload) * 100;
      
      return {
        ...member,
        currentTasks: memberTasks.length,
        workloadHours: workload,
        utilization: Math.min(utilization, 100)
      };
    });
  };

  const workloadData = getWorkloadDistribution();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle>Assistant IA de Planification</CardTitle>
        </div>
        <Button 
          onClick={handleOptimizeSchedule}
          disabled={isOptimizing}
          size="sm"
        >
          {isOptimizing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
              Optimisation...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Optimiser
            </>
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Vue d'ensemble du projet */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{tasks.length}</p>
              <p className="text-xs text-muted-foreground">Tâches totales</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{team.length}</p>
              <p className="text-xs text-muted-foreground">Membres équipe</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {tasks.reduce((sum, t) => sum + t.estimatedHours, 0)}h
              </p>
              <p className="text-xs text-muted-foreground">Effort estimé</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{project.progress}%</p>
              <p className="text-xs text-muted-foreground">Avancement</p>
            </div>
          </div>
        </div>

        {/* Charge de travail équipe */}
        <div>
          <h4 className="text-sm font-medium mb-3">Répartition de la charge</h4>
          <div className="space-y-3">
            {workloadData.map((member) => (
              <div key={member.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{member.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={member.utilization > 90 ? 'destructive' : member.utilization > 70 ? 'default' : 'secondary'}>
                      {member.utilization.toFixed(0)}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {member.currentTasks} tâches
                    </span>
                  </div>
                </div>
                <Progress value={member.utilization} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommandations d'optimisation */}
        {optimization && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Recommandations IA</h4>
              <Badge variant="outline">
                Confiance: {(optimization.confidence * 100).toFixed(0)}%
              </Badge>
            </div>
            <div className="space-y-2">
              {optimization.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                  <AlertTriangle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions rapides */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Voir Gantt
          </Button>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Réassigner
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Ajuster délais
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};