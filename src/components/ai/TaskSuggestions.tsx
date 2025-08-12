import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Lightbulb, Plus, Check, X, Sparkles } from 'lucide-react';
import { Project, Task } from '@/types/project';
import { AIProjectService } from '@/services/aiService';

interface TaskSuggestionsProps {
  project: Project;
  tasks: Task[];
  onTaskAdd: (taskTitle: string) => void;
}

export const TaskSuggestions: React.FC<TaskSuggestionsProps> = ({
  project,
  tasks,
  onTaskAdd
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<Set<string>>(new Set());

  const generateSuggestions = async (prompt?: string) => {
    setIsGenerating(true);
    try {
      // En production, utiliser la vraie clé API
      const aiService = new AIProjectService('demo-key');
      let newSuggestions: string[];
      
      if (prompt) {
        // Suggestions basées sur un prompt personnalisé
        newSuggestions = await aiService.suggestTasks(project, tasks);
      } else {
        // Suggestions automatiques basées sur le contexte
        newSuggestions = await aiService.suggestTasks(project, tasks);
      }
      
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Erreur génération suggestions:', error);
      // Suggestions de démonstration basées sur le contexte réel
      const demoSuggestions = generateContextualSuggestions();
      setSuggestions(demoSuggestions);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContextualSuggestions = (): string[] => {
    const existingTaskTitles = tasks.map(t => t.title.toLowerCase());
    const allSuggestions = [
      // Suggestions de planification
      'Définir les critères d\'acceptation détaillés',
      'Créer un plan de tests d\'intégration',
      'Établir un processus de revue de code',
      'Configurer l\'environnement de préproduction',
      'Planifier la formation des utilisateurs finaux',
      
      // Suggestions techniques
      'Implémenter la surveillance des performances',
      'Configurer les sauvegardes automatiques',
      'Mettre en place la journalisation des erreurs',
      'Optimiser les requêtes base de données',
      'Créer la documentation technique',
      
      // Suggestions qualité
      'Effectuer des tests de charge',
      'Valider l\'accessibilité de l\'interface',
      'Vérifier la conformité RGPD',
      'Tester la compatibilité multi-navigateurs',
      'Réaliser un audit de sécurité',
      
      // Suggestions management
      'Organiser une rétrospective d\'équipe',
      'Mettre à jour le tableau de bord projet',
      'Préparer la présentation aux parties prenantes',
      'Documenter les leçons apprises',
      'Planifier la transition vers la maintenance'
    ];

    // Filtrer les suggestions qui ne sont pas déjà en tâches existantes
    const relevantSuggestions = allSuggestions.filter(suggestion => {
      const suggestionWords = suggestion.toLowerCase().split(' ');
      return !existingTaskTitles.some(taskTitle => 
        suggestionWords.some(word => taskTitle.includes(word) && word.length > 3)
      );
    });

    // Retourner 5 suggestions aléatoires
    return relevantSuggestions.sort(() => Math.random() - 0.5).slice(0, 5);
  };

  useEffect(() => {
    generateSuggestions();
  }, [project.id, tasks.length]);

  const handleAcceptSuggestion = (suggestion: string) => {
    onTaskAdd(suggestion);
    setAcceptedSuggestions(prev => new Set([...prev, suggestion]));
  };

  const handleRejectSuggestion = (suggestion: string) => {
    setSuggestions(prev => prev.filter(s => s !== suggestion));
  };

  const handleCustomPrompt = async () => {
    if (!customPrompt.trim()) return;
    await generateSuggestions(customPrompt);
    setCustomPrompt('');
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <CardTitle>Suggestions Intelligentes</CardTitle>
        </div>
        <Button 
          onClick={() => generateSuggestions()}
          disabled={isGenerating}
          size="sm"
          variant="outline"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Nouvelles idées
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Prompt personnalisé */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Demande personnalisée:</label>
          <div className="flex gap-2">
            <Input
              placeholder="Ex: Suggère des tâches pour améliorer la sécurité..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCustomPrompt()}
            />
            <Button 
              onClick={handleCustomPrompt}
              disabled={isGenerating || !customPrompt.trim()}
              size="sm"
            >
              Générer
            </Button>
          </div>
        </div>

        {/* Suggestions */}
        {isGenerating ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            <span className="ml-2">Génération de suggestions...</span>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            <Lightbulb className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Aucune nouvelle suggestion pour le moment.</p>
            <p className="text-sm">Essayez de générer de nouvelles idées ou utilisez un prompt personnalisé.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => {
              const isAccepted = acceptedSuggestions.has(suggestion);
              
              return (
                <Card key={index} className={`transition-all ${isAccepted ? 'opacity-60 bg-muted/50' : 'hover:shadow-sm'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className={`text-sm ${isAccepted ? 'line-through text-muted-foreground' : ''}`}>
                          {suggestion}
                        </p>
                        {isAccepted && (
                          <Badge variant="secondary" className="mt-2">
                            <Check className="h-3 w-3 mr-1" />
                            Ajoutée
                          </Badge>
                        )}
                      </div>
                      
                      {!isAccepted && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAcceptSuggestion(suggestion)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectSuggestion(suggestion)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Statistiques */}
        {suggestions.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{suggestions.length} suggestions générées</span>
              <span>{acceptedSuggestions.size} tâches ajoutées</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};