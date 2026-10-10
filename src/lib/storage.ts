import { UserProgressData, TopicProgress, CertificateData } from '@/types/progress';

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

export function validateCertificateData(data: unknown): data is CertificateData {
  if (!data || typeof data !== 'object') return false;
  const c = data as Record<string, unknown>;
  return (
    c.certificateClaimed === true &&
    typeof c.studentName === 'string' &&
    c.studentName.trim().length >= 2 &&
    typeof c.courseId === 'string' &&
    c.courseId.trim().length > 0 &&
    typeof c.courseName === 'string' &&
    c.courseName.trim().length > 0 &&
    typeof c.completionDate === 'string' &&
    c.completionDate.trim().length > 0
  );
}

const COURSE_ID_ALIASES: Record<string, string[]> = {
  'level-1': ['level-1', 'what-is-coding', '01'],
  'level-2': ['level-2', 'algorithm', '02'],
  'level-3': ['level-3', 'html', '03'],
  'level-4': ['level-4', 'css', '04'],
  'level-5': ['level-5', 'javascript', '05'],
  'level-6': ['level-6', 'final-project', '06'],
};

export function getCertificateProgress(courseId: string): CertificateData | null {
  const progress = getStoredProgress();
  const candidateIds = COURSE_ID_ALIASES[courseId] || [courseId];
  for (const id of candidateIds) {
    const topic = progress.topics[id];
    if (topic && topic.certificate && validateCertificateData(topic.certificate)) {
      return topic.certificate;
    }
  }
  return null;
}

export function getAllEarnedCertificates(): CertificateData[] {
  const progress = getStoredProgress();
  const certs: CertificateData[] = [];
  const seenCourses = new Set<string>();

  for (const topicId in progress.topics) {
    const cert = progress.topics[topicId]?.certificate;
    if (cert && validateCertificateData(cert)) {
      if (!seenCourses.has(cert.courseId)) {
        seenCourses.add(cert.courseId);
        certs.push(cert);
      }
    }
  }
  return certs;
}

export function getCourseCertificateStatus(courseId: string): 'earned' | 'claimable' | 'locked' {
  const progress = getStoredProgress();
  const candidateIds = COURSE_ID_ALIASES[courseId] || [courseId];

  for (const id of candidateIds) {
    const topic = progress.topics[id];
    if (topic && topic.certificate && validateCertificateData(topic.certificate)) {
      return 'earned';
    }
  }

  for (const id of candidateIds) {
    const topic = progress.topics[id];
    if (topic && (topic.status === 'completed' || topic.quizCompleted === true || topic.practiceCompleted === true)) {
      return 'claimable';
    }
  }

  if ((courseId === 'level-6' || candidateIds.includes('level-6')) && progress.finalProject?.completed) {
    return 'claimable';
  }

  return 'locked';
}

export function saveCertificateClaim(
  courseId: string,
  studentName: string,
  courseName: string,
  completionDate?: string
): CertificateData {
  const current = getStoredProgress();
  const dateStr =
    completionDate ||
    new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

  const certData: CertificateData = {
    certificateClaimed: true,
    studentName: studentName.trim(),
    courseId,
    courseName,
    completionDate: dateStr,
    certificateVersion: 1,
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
