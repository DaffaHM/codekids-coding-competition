export type TopicType = 'quiz_topic' | 'coding_topic' | 'project_topic';

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Markdown / formatted content
  illustrationType?: 'diagram' | 'comparison' | 'code-preview' | 'none';
  illustrationData?: Record<string, unknown>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CodePracticeValidationRule {
  ruleId: string;
  description: string;
  checker: 'tag_exists' | 'style_contains' | 'js_eval';
  targetSymbol?: string;
}

export interface CodePractice {
  initialHtml: string;
  initialCss: string;
  initialJs: string;
  instructions: string[];
  solutionHints: string[];
  validationRules: CodePracticeValidationRule[];
}

export interface Topic {
  id: string; // e.g. "what-is-coding", "algorithm", "html", "css", "javascript", "final-project"
  number: string; // "01", "02", "03", "04", "05", "06"
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  type: TopicType;
  sections: LessonSection[];
  quizQuestions?: QuizQuestion[];
  codePractice?: CodePractice;
}
