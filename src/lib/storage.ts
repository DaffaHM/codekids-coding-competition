import { UserProgressData, TopicProgress } from '@/types/progress';

const STORAGE_KEY = 'codekids_user_progress_v1';

const defaultProgress: UserProgressData = {
  topics: {},
  finalProject: {
    completed: false,
  },
};

export function getStoredProgress(): UserProgressData {
  if (typeof window === 'undefined') {
    return defaultProgress;
  }
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (!item) return defaultProgress;
    return JSON.parse(item) as UserProgressData;
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return defaultProgress;
  }
}

export function saveTopicProgress(
  topicId: string,
  update: Partial<TopicProgress>
): UserProgressData {
  const current = getStoredProgress();
  const existingTopic = current.topics[topicId] || {
    topicId,
    status: 'not_started',
    currentSectionIndex: 0,
    quizCompleted: false,
    practiceCompleted: false,
    updatedAt: new Date().toISOString(),
  };

  const updatedTopic: TopicProgress = {
    ...existingTopic,
    ...update,
    updatedAt: new Date().toISOString(),
  };

  const nextState: UserProgressData = {
    ...current,
    topics: {
      ...current.topics,
      [topicId]: updatedTopic,
    },
  };

  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    }
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }

  return nextState;
}

export function getCertificateProgress(courseId: string) {
  const progress = getStoredProgress();
  const topic = progress.topics[courseId];
  if (topic && topic.certificate && topic.certificate.certificateClaimed) {
    return topic.certificate;
  }
  return null;
}

export function saveCertificateClaim(
  courseId: string,
  studentName: string,
  courseName: string,
  completionDate?: string
) {
  const current = getStoredProgress();
  const dateStr =
    completionDate ||
    new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

  const certData = {
    certificateClaimed: true,
    studentName,
    courseId,
    courseName,
    completionDate: dateStr,
  };

  const existingTopic = current.topics[courseId] || {
    topicId: courseId,
    status: 'completed' as const,
    currentSectionIndex: 0,
    quizCompleted: true,
    practiceCompleted: true,
    updatedAt: new Date().toISOString(),
  };

  const updatedTopic = {
    ...existingTopic,
    status: 'completed' as const,
    certificate: certData,
    updatedAt: new Date().toISOString(),
  };

  const nextState: UserProgressData = {
    ...current,
    topics: {
      ...current.topics,
      [courseId]: updatedTopic,
    },
  };

  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    }
  } catch (error) {
    console.warn('Failed to save certificate to localStorage:', error);
  }

  return certData;
}

export function saveFinalProjectProgress(
  studentName: string,
  code: { html: string; css: string; js: string }
): UserProgressData {
  const current = getStoredProgress();
  const nextState: UserProgressData = {
    ...current,
    finalProject: {
      completed: true,
      studentName,
      codeHtml: code.html,
      codeCss: code.css,
      codeJs: code.js,
      completedAt: new Date().toISOString(),
    },
  };

  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    }
  } catch (error) {
    console.warn('Failed to save final project to localStorage:', error);
  }

  return nextState;
}
