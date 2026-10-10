export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface CertificateData {
  certificateClaimed: boolean;
  studentName: string;
  courseId: string;
  courseName: string;
  completionDate: string;
  certificateVersion?: number;
}

export interface TopicProgress {
  topicId: string;
  status: ProgressStatus;
  currentSectionIndex: number;
  quizScore?: number;
  quizCompleted: boolean;
  practiceCompleted: boolean;
  certificate?: CertificateData;
  updatedAt: string;
}

export interface FinalProjectProgress {
  completed: boolean;
  studentName?: string;
  codeHtml?: string;
  codeCss?: string;
  codeJs?: string;
  completedAt?: string;
}

export interface UserProgressData {
  topics: Record<string, TopicProgress>;
  finalProject: FinalProjectProgress;
}
