import React from "react";
import { 
  MapPin, Calendar, ClipboardList, CheckSquare, Bell, Users, Zap, 
  Brain, Sparkles, Eye, MessageSquare, TrendingUp, Shield,
  Bot, Cpu, Network, Scan, Target, Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";

// AI-Enhanced Wireframes Preview Component
// Showcasing the future of construction project management with AI

export default function AIWireframesPreview() {
  const sampleProject = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Résidence Les Amandiers - AI Optimized",
    address: "12 Rue des Fleurs, Lyon",
    start: "2025-09-01",
    end: "2026-01-30",
    progress: 42,
    budget_planned: 120000,
    budget_spent: 52000,
    phases: 5,
    aiConfidence: 94,
    predictedDelay: 0,
    riskScore: "LOW"
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
    qualityScore: 8.7
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background ai-neural-bg">
      <div className="p-6 space-y-8">
        {/* AI-Enhanced Header */}
        <motion.header 
          className="flex items-center justify-between ai-glass rounded-3xl p-6"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl animate-ai-glow">
                <Brain size={32} className="text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold ai-gradient-text">ProjetApp AI</h1>
              <p className="text-muted-foreground">Construction intelligente avec IA prédictive</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button 
              className="ai-button-ghost px-4 py-2 rounded-xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot size={16}/> 
              <span>AI Assistant</span>
            </motion.button>
            
            <motion.button 
              className="ai-button-ghost px-4 py-2 rounded-xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={16}/> 
              <span>3 Alertes IA</span>
            </motion.button>
            
            <div className="ai-glass px-4 py-2 rounded-xl flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full" />
              <span>Mohamed</span>
            </div>
          </div>
        </motion.header>

        {/* AI Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* AI-Enhanced Dashboard */}
          <motion.section
            className="ai-glass p-6 rounded-3xl space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles size={20} className="text-primary" />
                  Tableau de Bord IA
                </h2>
                <p className="text-muted-foreground text-sm">Insights prédictifs et optimisation automatique</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div>Synchro AI temps réel</div>
                <div className="text-primary">• Live</div>
              </div>
            </div>

            {/* AI KPIs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-2xl border border-primary/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Projets Actifs</div>
                    <div className="text-2xl font-bold">8</div>
                  </div>
                  <TrendingUp size={16} className="text-primary" />
                </div>
                <div className="text-xs text-primary mt-1">+12% ce mois</div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-accent/10 to-primary/10 p-4 rounded-2xl border border-accent/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">IA Prédictions</div>
                    <div className="text-2xl font-bold text-accent">94%</div>
                  </div>
                  <Brain size={16} className="text-accent" />
                </div>
                <div className="text-xs text-accent mt-1">Précision IA</div>
              </motion.div>
            </div>

            {/* AI Risk Assessment */}
            <motion.div 
              className="bg-gradient-to-r from-accent/5 to-primary/5 p-4 rounded-2xl border border-accent/20"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-accent" />
                  <span className="text-sm font-medium">Analyse des Risques IA</span>
                </div>
                <div className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                  RISQUE FAIBLE
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Risque météo</span>
                  <span className="text-accent">15%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 bg-gradient-to-r from-accent to-primary rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </motion.div>

            {/* AI Suggestions */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Lightbulb size={16} className="text-primary" />
                Suggestions IA
              </h3>
              <div className="space-y-3">
                <motion.div 
                  className="bg-primary/5 border border-primary/20 p-3 rounded-xl"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Optimisation planning</div>
                      <div className="text-xs text-muted-foreground">L'IA suggère de décaler la phase électricité de 2 jours</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-secondary/5 border border-secondary/20 p-3 rounded-xl"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 animate-pulse" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Alerte budget</div>
                      <div className="text-xs text-muted-foreground">Dépassement prévu de 3% sur le gros œuvre</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* AI-Enhanced Project View */}
          <motion.section 
            className="ai-glass p-6 rounded-3xl space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Network size={20} className="text-secondary" />
                  Projet Intelligent
                </h2>
                <p className="text-muted-foreground text-sm">Gestion autonome avec IA prédictive</p>
              </div>
              <div className="flex gap-2">
                <motion.button 
                  className="ai-button-primary px-3 py-2 rounded-xl text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Auto-Optimiser
                </motion.button>
                <motion.button 
                  className="ai-button-ghost px-3 py-2 rounded-xl text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  IA Actions
                </motion.button>
              </div>
            </div>

            {/* Project Header with AI Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Projet IA-Optimisé</div>
                  <div className="font-semibold">{sampleProject.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin size={12} />
                    {sampleProject.address}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Budget Intelligent</div>
                  <div className="font-medium">€{sampleProject.budget_planned.toLocaleString()}</div>
                  <div className="text-xs text-accent">IA: -2% prévu</div>
                </div>
              </div>

              {/* AI Confidence Meter */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-2xl border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Cpu size={16} className="text-primary" />
                    Confiance IA
                  </span>
                  <span className="text-lg font-bold text-primary">{sampleProject.aiConfidence}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <motion.div 
                    className="h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${sampleProject.aiConfidence}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* AI-Enhanced Stats */}
            <div className="grid grid-cols-3 gap-3">
              <motion.div 
                className="bg-accent/5 border border-accent/20 p-3 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Eye size={16} className="text-accent mx-auto mb-1" />
                <div className="text-xs text-muted-foreground">Vision IA</div>
                <div className="font-bold">1,247</div>
                <div className="text-xs text-accent">Photos analysées</div>
              </motion.div>

              <motion.div 
                className="bg-primary/5 border border-primary/20 p-3 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Target size={16} className="text-primary mx-auto mb-1" />
                <div className="text-xs text-muted-foreground">Prédictions</div>
                <div className="font-bold">56</div>
                <div className="text-xs text-primary">Tâches auto-planifiées</div>
              </motion.div>

              <motion.div 
                className="bg-secondary/5 border border-secondary/20 p-3 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare size={16} className="text-secondary mx-auto mb-1" />
                <div className="text-xs text-muted-foreground">IA Chat</div>
                <div className="font-bold">24/7</div>
                <div className="text-xs text-secondary">Assistant actif</div>
              </motion.div>
            </div>

            {/* AI-Optimized Phases */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Scan size={16} className="text-primary" />
                Phases IA-Optimisées
              </h3>
              <div className="space-y-3">
                <motion.div 
                  className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 p-4 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        RDC — Électricité
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      </div>
                      <div className="text-xs text-muted-foreground">IA: 48% • Packages: 3 • Tâches: 12</div>
                      <div className="text-xs text-primary mt-1">Optimisation active +15% efficacité</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/20 p-4 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        1er étage — Carrelage
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                      </div>
                      <div className="text-xs text-muted-foreground">IA: 30% • Packages: 2 • Tâches: 9</div>
                      <div className="text-xs text-secondary mt-1">Prédiction: fin anticipée de 3 jours</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* AI-Enhanced Mobile Task View */}
          <motion.section 
            className="ai-glass p-6 rounded-3xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bot size={20} className="text-accent" />
                Tâche IA Mobile
              </h2>
              <div className="text-xs text-muted-foreground bg-accent/10 px-2 py-1 rounded-full">
                Assistant IA actif
              </div>
            </div>

            <div className="bg-gradient-to-b from-muted/30 to-muted/10 rounded-2xl p-4">
              {/* Mobile Frame */}
              <motion.div 
                className="w-full max-w-xs mx-auto ai-glass rounded-3xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-5 space-y-4">
                  {/* Task Header with AI Status */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{sampleTask.title}</div>
                      <div className="text-xs text-muted-foreground">{sampleTask.start_planned} → {sampleTask.end_planned}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Brain size={12} className="text-primary" />
                        <span className="text-xs text-primary">Score IA: {sampleTask.qualityScore}/10</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                        {sampleTask.status}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{sampleTask.progress}%</div>
                    </div>
                  </div>

                  {/* AI-Enhanced Description */}
                  <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl">
                    <div className="text-sm">{sampleTask.description}</div>
                    <div className="text-xs text-primary mt-2 flex items-center gap-1">
                      <Sparkles size={12} />
                      IA suggère: Vérifier isolation avant installation
                    </div>
                  </div>

                  {/* AI Stats Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-2 rounded-lg text-xs text-center">
                      <Users size={14} className="mx-auto mb-1 text-accent" />
                      <div className="text-muted-foreground">Équipe</div>
                      <div className="font-bold">{sampleTask.assignee}</div>
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-2 rounded-lg text-xs text-center">
                      <Eye size={14} className="mx-auto mb-1 text-primary" />
                      <div className="text-muted-foreground">Photos</div>
                      <div className="font-bold">{sampleTask.photos}</div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary/10 to-accent/10 p-2 rounded-lg text-xs text-center">
                      <Lightbulb size={14} className="mx-auto mb-1 text-secondary" />
                      <div className="text-muted-foreground">IA Ideas</div>
                      <div className="font-bold">{sampleTask.aiSuggestions}</div>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-2 rounded-lg text-xs text-center">
                      <CheckSquare size={14} className="mx-auto mb-1 text-accent" />
                      <div className="text-muted-foreground">Check</div>
                      <div className="font-bold">4</div>
                    </div>
                  </div>

                  {/* AI-Enhanced Checklist */}
                  <div>
                    <div className="text-xs font-medium mb-2 flex items-center gap-2">
                      <Brain size={12} className="text-primary" />
                      Checklist IA-Assistée
                    </div>
                    <div className="space-y-2">
                      <motion.div 
                        className="flex items-center justify-between text-sm bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20 p-3 rounded-xl"
                        whileHover={{ x: 2 }}
                      >
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                          <span>Démontage ancien tableau</span>
                        </div>
                        <div className="text-xs text-accent">✓ IA Validé</div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between text-sm bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 p-3 rounded-xl"
                        whileHover={{ x: 2 }}
                      >
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="h-4 w-4 accent-primary" />
                          <span>Installer disjoncteur</span>
                        </div>
                        <div className="text-xs text-primary">⏳ IA Analyse</div>
                      </motion.div>
                    </div>
                  </div>

                  {/* AI-Enhanced Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <motion.button 
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      IA Auto-Complete
                    </motion.button>
                    <motion.button 
                      className="py-3 px-4 rounded-xl ai-button-ghost"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageSquare size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <div className="mt-4 text-xs text-center text-muted-foreground">
                Interface mobile avec IA prédictive • Tap pour ouvrir
              </div>
            </div>
          </motion.section>
        </div>

        {/* AI-Enhanced Footer */}
        <motion.footer 
          className="text-center space-y-2 ai-glass p-6 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-sm font-medium ai-gradient-text">
            ProjetApp AI — L'avenir de la construction intelligente
          </div>
          <div className="text-xs text-muted-foreground">
            Propulsé par l'IA prédictive • Vision par ordinateur • Optimisation automatique • Assistant 24/7
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Modèles IA en temps réel
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              97% de précision prédictive
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              +40% d'efficacité chantier
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}