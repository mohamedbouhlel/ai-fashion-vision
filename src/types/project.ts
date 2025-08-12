export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  estimatedHours: number;
  actualHours: number;
  budget?: number;
  teamSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigneeId?: string;
  estimatedHours: number;
  actualHours: number;
  startDate: string;
  dueDate: string;
  dependencies: string[];
  tags: string[];
  progress: number;
  riskScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  currentWorkload: number; // hours per week
  maxWorkload: number;
  efficiency: number; // 0-1 score
}

export interface AIInsight {
  id: string;
  type: 'schedule_optimization' | 'risk_alert' | 'task_suggestion' | 'kpi_insight';
  projectId: string;
  title: string;
  description: string;
  confidence: number; // 0-1
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  suggestions: string[];
  createdAt: string;
}

export interface ProjectMetrics {
  projectId: string;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  averageCompletionTime: number;
  budgetUtilization: number;
  teamEfficiency: number;
  riskScore: number;
  predictedCompletionDate: string;
  confidenceInterval: number;
}