import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, TrendingDown, Clock, Users, Target, RefreshCw } from 'lucide-react';
import { Project, Task, AIInsight } from '@/types/project';
import { AIProjectService } from '@/services/aiService';

interface RiskAnalyzerProps {
  project: Project;
  tasks: Task[];
  onInsightAction: (insight: AIInsight) => void;
}

export const RiskAnalyzer: React.FC<RiskAnalyzerProps> = ({
  project,
  tasks,
  onInsightAction
}) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null);

  const analyzeRisks = async () => {
    setIsAnalyzing(true);
    try {
      // En production, utiliser la vraie clé API
      const aiService = new AIProjectService('demo-key');
      const newInsights = await aiService.analyzeDelayRisks(project, tasks);
      setInsights(newInsights);
      setLastAnalysis(new Date());
    } catch (error) {
      console.error('Erreur analyse risques:', error);
      // Simulation pour la démo
      const demoInsights: AIInsight[] = [];
      
      // Analyser les vraies données
      const overdueTasks = tasks.filter(t => 
        new Date(t.dueDate) < new Date() && t.status !== 'completed'
      );
      
      if (overdueTasks.length > 0) {
        demoInsights.push({
          id: `risk_${Date.now()}_overdue`,
          type: 'risk_alert',
          projectId: project.id,
          title: `${overdueTasks.length} tâches en retard détectées`,
          description: `Des tâches critiques accusent du retard, ce qui pourrait impacter la livraison finale.`,
          confidence: 0.9,
          priority: 'high',
          actionRequired: true,
          suggestions: [
            'Réassigner les tâches en retard à des membres disponibles',
            'Prioriser les tâches bloquantes',
            'Envisager une extension des délais'
          ],
          createdAt: new Date().toISOString()
        });
      }

      const highPriorityTasks = tasks.filter(t => 
        t.priority === 'high' && t.status !== 'completed' && t.progress < 50
      );

      if (highPriorityTasks.length > 0) {
        demoInsights.push({
          id: `risk_${Date.now()}_priority`,
          type: 'risk_alert',
          projectId: project.id,
          title: `${highPriorityTasks.length} tâches prioritaires à risque`,
          description: `Des tâches haute priorité ont un faible avancement et risquent de prendre du retard.`,
          confidence: 0.75,
          priority: 'medium',
          actionRequired: true,
          suggestions: [
            'Augmenter les ressources allouées',
            'Organiser des points de suivi quotidiens',
            'Identifier et lever les blocages'
          ],
          createdAt: new Date().toISOString()
        });
      }

      // Ajout d'insights prédictifs
      const totalEstimated = tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
      const totalActual = tasks.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.actualHours, 0);
      const estimatedRemaining = tasks.filter(t => t.status !== 'completed').reduce((sum, t) => sum + t.estimatedHours, 0);

      if (totalActual > 0 && (totalActual / tasks.filter(t => t.status === 'completed').length) > (totalEstimated / tasks.length) * 1.2) {
        demoInsights.push({
          id: `risk_${Date.now()}_estimation`,
          type: 'risk_alert',
          projectId: project.id,
          title: 'Dépassement d\'estimation détecté',
          description: 'Les tâches prennent en moyenne 20% de temps supplémentaire par rapport aux estimations.',
          confidence: 0.8,
          priority: 'medium',
          actionRequired: false,
          suggestions: [
            'Réajuster les estimations des tâches restantes',
            'Analyser les causes des dépassements',
            'Améliorer le processus d\'estimation'
          ],
          createdAt: new Date().toISOString()
        });
      }

      setInsights(demoInsights);
      setLastAnalysis(new Date());
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    analyzeRisks();
  }, [project.id, tasks.length]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'medium': return <TrendingDown className="h-4 w-4 text-warning" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          <CardTitle>Analyse Prédictive des Risques</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {lastAnalysis && (
            <span className="text-xs text-muted-foreground">
              Dernière analyse: {lastAnalysis.toLocaleTimeString()}
            </span>
          )}
          <Button 
            onClick={analyzeRisks}
            disabled={isAnalyzing}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            <span className="ml-2">Analyse en cours...</span>
          </div>
        ) : insights.length === 0 ? (
          <Alert>
            <Target className="h-4 w-4" />
            <AlertDescription>
              Aucun risque majeur détecté. Le projet semble bien avancer selon le planning prévu.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(insight.priority)}
                        <h4 className="font-medium">{insight.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(insight.priority) as any}>
                          {insight.priority}
                        </Badge>
                        <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                          {(insight.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>

                    {insight.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Actions recommandées:</h5>
                        <ul className="space-y-1">
                          {insight.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {insight.actionRequired && (
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm"
                          onClick={() => onInsightAction(insight)}
                        >
                          Appliquer les actions
                        </Button>
                        <Button size="sm" variant="outline">
                          Marquer comme traité
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};