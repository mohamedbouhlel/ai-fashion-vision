import React from "react";
import { MapPin, Calendar, CheckSquare, Bell, Users, Zap, Brain, TrendingUp, Sparkles, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function CleanAIWireframesPreview() {
  const sampleProject = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Rénovation - Résidence Les Amandiers",
    address: "12 Rue des Fleurs, Lyon",
    start: "2025-09-01",
    end: "2026-01-30",
    progress: 42,
    budget_planned: 120000,
    budget_spent: 52000,
    phases: 5,
    aiScore: 94,
  };

  const sampleTask = {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    title: "Installer tableau électrique RDC",
    description: "Tableau 12 modules, disjoncteur différentiel 30mA. Vérifier phase et neutre.",
    start_planned: "2025-09-01",
    end_planned: "2025-09-02",
    status: "En cours",
    assignee: "Ali",
    progress: 45,
    photos: 2,
    aiSuggestions: 3,
  };

  return (
    <div className="p-6 space-y-8 bg-background min-h-screen font-sans text-foreground">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-card shadow-sm rounded-2xl p-3 border border-border">
            <Brain className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">ProjetApp AI — Clean Interface</h1>
            <p className="text-sm text-muted-foreground">Interface claire avec assistance IA intégrée</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-card rounded-xl shadow-sm border border-border flex items-center gap-2 hover:bg-muted transition-colors">
            <Bell size={16} className="text-muted-foreground" />
            <span className="text-sm">Notifications</span>
          </button>
          <div className="bg-card px-4 py-2 rounded-xl shadow-sm border border-border text-sm">Mohamed</div>
        </div>
      </header>

      {/* Grid for desktop previews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clean Dashboard */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-6 rounded-2xl shadow-sm border border-border"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Tableau de bord IA</h2>
              <p className="text-sm text-muted-foreground">Vue d'ensemble intelligente de vos projets</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-muted-foreground">IA Active</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* AI Insights Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Assistant IA</span>
              </div>
              <p className="text-sm text-foreground">3 tâches peuvent être optimisées pour économiser 2 jours</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-xs text-muted-foreground mb-1">Projets actifs</div>
                <div className="text-2xl font-bold text-foreground">8</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp size={12} className="text-accent" />
                  <span className="text-xs text-accent">+2 ce mois</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-xs text-muted-foreground mb-1">Score IA moyen</div>
                <div className="text-2xl font-bold text-primary">{sampleProject.aiScore}%</div>
                <div className="text-xs text-muted-foreground mt-1">Optimisation</div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-foreground">Prochain jalon</div>
                  <div className="text-xs text-muted-foreground">Livraison gros œuvre — 2025-10-15</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{sampleProject.progress}%</div>
                  <div className="text-xs text-muted-foreground">Avancement</div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500" 
                  style={{ width: `${sampleProject.progress}%` }} 
                />
              </div>
            </div>

            {/* Recent Projects */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Projets récents</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors">
                  <div>
                    <div className="font-medium text-sm text-foreground">{sampleProject.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={12} />
                      {sampleProject.address}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{sampleProject.progress}%</div>
                    <div className="text-xs text-muted-foreground">{sampleProject.start}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Clean Project View */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="bg-card p-6 rounded-2xl shadow-sm border border-border"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Vue projet intelligente</h2>
              <p className="text-sm text-muted-foreground">Analyse IA et suivi détaillé</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm border border-accent/20 hover:bg-accent/20 transition-colors">
                Optimiser IA
              </button>
              <button className="px-3 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                Actions
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Project Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Projet</div>
                <div className="font-semibold text-foreground">{sampleProject.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin size={12} />
                  {sampleProject.address}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">Budget</div>
                <div className="text-lg font-bold text-foreground">€{sampleProject.budget_planned.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Dépensé: €{sampleProject.budget_spent.toLocaleString()}</div>
              </div>
            </div>

            {/* AI Analysis Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Analyse IA</span>
                </div>
                <span className="text-sm font-bold text-accent">{sampleProject.aiScore}% optimisé</span>
              </div>
              <p className="text-sm text-muted-foreground">Le projet suit la planification. 2 optimisations suggérées.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground mb-1">Phases</div>
                <div className="text-lg font-bold text-foreground">{sampleProject.phases}</div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground mb-1">Tâches</div>
                <div className="text-lg font-bold text-foreground">56</div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground mb-1">Équipe</div>
                <div className="text-lg font-bold text-foreground">4</div>
              </div>
            </div>

            {/* Phases List */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Phases & Packages</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors">
                  <div>
                    <div className="font-medium text-sm text-foreground">RDC — Électricité</div>
                    <div className="text-xs text-muted-foreground">Packages: 3 • Tâches: 12</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">48%</div>
                    <div className="w-16 bg-muted rounded-full h-1 mt-1">
                      <div className="w-1/2 h-1 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors">
                  <div>
                    <div className="font-medium text-sm text-foreground">1er étage — Carrelage</div>
                    <div className="text-xs text-muted-foreground">Packages: 2 • Tâches: 9</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">30%</div>
                    <div className="w-16 bg-muted rounded-full h-1 mt-1">
                      <div className="w-1/3 h-1 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Clean Mobile Task View */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="bg-card p-6 rounded-2xl shadow-sm border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Fiche tâche mobile</h2>
            <div className="text-xs text-muted-foreground">Interface épurée</div>
          </div>

          <div className="bg-muted/30 rounded-xl p-4">
            {/* Mobile frame */}
            <div className="w-full max-w-xs mx-auto bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="p-4 space-y-4">
                {/* Task Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{sampleTask.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar size={12} />
                      {sampleTask.start_planned} → {sampleTask.end_planned}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{sampleTask.status}</div>
                    <div className="text-xs text-muted-foreground">{sampleTask.progress}%</div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain size={14} className="text-primary" />
                    <span className="text-xs font-medium text-primary">IA suggère</span>
                  </div>
                  <p className="text-xs text-foreground">Optimiser l'ordre des tâches pour économiser 30min</p>
                </div>

                {/* Task Description */}
                <div className="text-sm text-muted-foreground">{sampleTask.description}</div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-muted rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Assigné</div>
                    <div className="text-sm font-medium text-foreground">{sampleTask.assignee}</div>
                  </div>
                  <div className="p-2 bg-muted rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Photos</div>
                    <div className="text-sm font-medium text-foreground">{sampleTask.photos}</div>
                  </div>
                  <div className="p-2 bg-muted rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">IA Tips</div>
                    <div className="text-sm font-medium text-primary">{sampleTask.aiSuggestions}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Avancement</span>
                    <span className="text-xs font-medium text-foreground">{sampleTask.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500" 
                      style={{ width: `${sampleTask.progress}%` }} 
                    />
                  </div>
                </div>

                {/* Checklist Preview */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Checklist (2/4)</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm bg-muted/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckSquare size={14} className="text-accent" />
                        <span className="text-foreground">Démontage ancien tableau</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-muted/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border border-muted-foreground rounded"></div>
                        <span className="text-muted-foreground">Installer disjoncteur</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                    Marquer terminé
                  </button>
                  <button className="py-2 px-3 rounded-lg bg-card border border-border text-sm hover:bg-muted transition-colors">
                    Plus
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-muted-foreground text-center">Interface mobile optimisée</div>
          </div>
        </motion.section>
      </div>

      <footer className="mt-8 text-sm text-muted-foreground border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <span>Interface claire avec assistance IA intégrée • Design épuré et moderne</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>Système de design cohérent</span>
          </div>
        </div>
      </footer>
    </div>
  );
}