import { Project, Task, TeamMember, AIInsight, ProjectMetrics } from '@/types/project';

// Configuration for AI service
const AI_CONFIG = {
  apiEndpoint: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-4',
  maxTokens: 2000,
  temperature: 0.3,
};

export class AIProjectService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Assistant IA de planification
  async optimizeSchedule(project: Project, tasks: Task[], team: TeamMember[]): Promise<{
    optimizedTasks: Task[];
    recommendations: string[];
    confidence: number;
  }> {
    const prompt = `
Analysez ce projet et optimisez la planification:

Projet: ${project.name}
Durée: ${project.startDate} à ${project.endDate}
Équipe: ${team.length} membres
Tâches: ${tasks.length}

Tâches actuelles:
${tasks.map(t => `- ${t.title} (${t.estimatedHours}h, priorité: ${t.priority}, dépendances: ${t.dependencies.join(', ')})`).join('\n')}

Équipe:
${team.map(m => `- ${m.name}: ${m.role}, charge: ${m.currentWorkload}/${m.maxWorkload}h, efficacité: ${Math.round(m.efficiency * 100)}%`).join('\n')}

Optimisez la planification en tenant compte des dépendances, de la charge de travail et des compétences.
Retournez une réponse JSON avec les recommandations d'optimisation.
`;

    try {
      const response = await this.callOpenAI(prompt);
      return this.parseScheduleOptimization(response, tasks);
    } catch (error) {
      console.error('Erreur optimisation planning:', error);
      return {
        optimizedTasks: tasks,
        recommendations: ['Impossible d\'optimiser automatiquement. Vérifiez les dépendances manuellement.'],
        confidence: 0.1
      };
    }
  }

  // Analyse prédictive des retards
  async analyzeDelayRisks(project: Project, tasks: Task[]): Promise<AIInsight[]> {
    const currentDate = new Date();
    const overdueTasks = tasks.filter(t => new Date(t.dueDate) < currentDate && t.status !== 'completed');
    const upcomingTasks = tasks.filter(t => {
      const due = new Date(t.dueDate);
      const inNextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      return due <= inNextWeek && t.status !== 'completed';
    });

    const insights: AIInsight[] = [];

    // Analyser les tâches en retard
    if (overdueTasks.length > 0) {
      insights.push({
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

    // Analyser les tâches à risque
    const riskyTasks = upcomingTasks.filter(t => 
      t.progress < 50 && t.priority === 'high'
    );

    if (riskyTasks.length > 0) {
      insights.push({
        id: `risk_${Date.now()}_upcoming`,
        type: 'risk_alert',
        projectId: project.id,
        title: `${riskyTasks.length} tâches à risque identifiées`,
        description: `Des tâches prioritaires risquent de ne pas être terminées à temps.`,
        confidence: 0.75,
        priority: 'medium',
        actionRequired: true,
        suggestions: [
          'Augmenter les ressources sur ces tâches',
          'Diviser les tâches complexes',
          'Organiser des points quotidiens'
        ],
        createdAt: new Date().toISOString()
      });
    }

    return insights;
  }

  // Suggestions intelligentes de tâches
  async suggestTasks(project: Project, existingTasks: Task[]): Promise<string[]> {
    const taskTypes = existingTasks.map(t => t.title.toLowerCase());
    const projectPhase = this.determineProjectPhase(project, existingTasks);

    const prompt = `
Basé sur ce projet en phase "${projectPhase}":
Nom: ${project.name}
Description: ${project.description}
Tâches existantes: ${taskTypes.join(', ')}

Suggérez 5 tâches pertinentes qui pourraient manquer pour ce type de projet.
Répondez uniquement avec une liste de tâches, une par ligne.
`;

    try {
      const response = await this.callOpenAI(prompt);
      return response.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^-\s*/, '').trim())
        .slice(0, 5);
    } catch (error) {
      console.error('Erreur suggestions tâches:', error);
      return this.getDefaultTaskSuggestions(projectPhase);
    }
  }

  // Génération de métriques intelligentes
  generateProjectMetrics(project: Project, tasks: Task[]): ProjectMetrics {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const overdueTasks = tasks.filter(t => 
      new Date(t.dueDate) < new Date() && t.status !== 'completed'
    ).length;

    const completedTasksWithTime = tasks.filter(t => 
      t.status === 'completed' && t.actualHours > 0
    );
    const averageCompletionTime = completedTasksWithTime.length > 0
      ? completedTasksWithTime.reduce((sum, t) => sum + t.actualHours, 0) / completedTasksWithTime.length
      : 0;

    const riskScore = this.calculateRiskScore(project, tasks);
    const predictedCompletion = this.predictCompletionDate(project, tasks);

    return {
      projectId: project.id,
      totalTasks,
      completedTasks,
      overdueTasks,
      averageCompletionTime,
      budgetUtilization: project.budget ? (project.actualHours * 50) / project.budget : 0,
      teamEfficiency: this.calculateTeamEfficiency(tasks),
      riskScore,
      predictedCompletionDate: predictedCompletion.date,
      confidenceInterval: predictedCompletion.confidence
    };
  }

  private async callOpenAI(prompt: string): Promise<string> {
    const response = await fetch(AI_CONFIG.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: AI_CONFIG.maxTokens,
        temperature: AI_CONFIG.temperature
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  private parseScheduleOptimization(response: string, originalTasks: Task[]) {
    try {
      const parsed = JSON.parse(response);
      return {
        optimizedTasks: originalTasks, // En production, appliquer les optimisations
        recommendations: parsed.recommendations || [],
        confidence: parsed.confidence || 0.7
      };
    } catch {
      return {
        optimizedTasks: originalTasks,
        recommendations: ['Optimisation automatique en cours de développement'],
        confidence: 0.5
      };
    }
  }

  private determineProjectPhase(project: Project, tasks: Task[]): string {
    const completionRate = tasks.length > 0 
      ? tasks.filter(t => t.status === 'completed').length / tasks.length
      : 0;

    if (completionRate < 0.2) return 'initialisation';
    if (completionRate < 0.5) return 'développement';
    if (completionRate < 0.8) return 'finalisation';
    return 'livraison';
  }

  private getDefaultTaskSuggestions(phase: string): string[] {
    const suggestions = {
      initialisation: [
        'Définir les exigences fonctionnelles',
        'Créer l\'architecture technique',
        'Mettre en place l\'environnement de développement',
        'Planifier les sprints',
        'Constituer l\'équipe projet'
      ],
      développement: [
        'Implémenter les fonctionnalités core',
        'Rédiger les tests unitaires',
        'Configurer l\'intégration continue',
        'Réviser le code',
        'Documenter l\'API'
      ],
      finalisation: [
        'Tests d\'intégration complets',
        'Optimisation des performances',
        'Tests utilisateurs',
        'Correction des bugs critiques',
        'Préparation du déploiement'
      ],
      livraison: [
        'Déploiement en production',
        'Formation des utilisateurs',
        'Documentation utilisateur',
        'Plan de maintenance',
        'Retour d\'expérience projet'
      ]
    };

    return suggestions[phase] || suggestions.développement;
  }

  private calculateRiskScore(project: Project, tasks: Task[]): number {
    let risk = 0;
    const now = new Date();
    const projectEnd = new Date(project.endDate);
    const timeRemaining = (projectEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    
    // Risque temporel
    if (timeRemaining < 7) risk += 0.4;
    else if (timeRemaining < 14) risk += 0.2;

    // Risque tâches en retard
    const overdueTasks = tasks.filter(t => 
      new Date(t.dueDate) < now && t.status !== 'completed'
    ).length;
    risk += (overdueTasks / tasks.length) * 0.4;

    // Risque charge de travail
    const incompleteTasks = tasks.filter(t => t.status !== 'completed');
    const remainingHours = incompleteTasks.reduce((sum, t) => sum + t.estimatedHours, 0);
    if (remainingHours > timeRemaining * 8) risk += 0.3;

    return Math.min(risk, 1);
  }

  private calculateTeamEfficiency(tasks: Task[]): number {
    const completedTasks = tasks.filter(t => 
      t.status === 'completed' && t.estimatedHours > 0 && t.actualHours > 0
    );

    if (completedTasks.length === 0) return 0.7;

    const efficiencySum = completedTasks.reduce((sum, task) => 
      sum + (task.estimatedHours / task.actualHours), 0
    );

    return Math.min(efficiencySum / completedTasks.length, 1.5) / 1.5;
  }

  private predictCompletionDate(project: Project, tasks: Task[]): { date: string; confidence: number } {
    const incompleteTasks = tasks.filter(t => t.status !== 'completed');
    const remainingHours = incompleteTasks.reduce((sum, t) => sum + t.estimatedHours, 0);
    
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const avgHoursPerDay = completedTasks.length > 0 
      ? completedTasks.reduce((sum, t) => sum + t.actualHours, 0) / completedTasks.length / 7
      : 8;

    const daysNeeded = Math.ceil(remainingHours / avgHoursPerDay);
    const predictedDate = new Date(Date.now() + daysNeeded * 24 * 60 * 60 * 1000);
    
    const confidence = completedTasks.length > 5 ? 0.8 : 0.5;

    return {
      date: predictedDate.toISOString().split('T')[0],
      confidence
    };
  }
}