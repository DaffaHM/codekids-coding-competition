export const CERTIFICATE_LAYOUT = {
  page: {
    width: 1491,
    height: 1055,
  },
  templateUrl: '/certificates/codekids-certificate1.png',

  name: {
    x: 0,
    y: 445,
    width: 1491,
    height: 70,
    defaultFontSize: 48,
    minFontSize: 26,
    color: '#17233C',
  },

  course: {
    x: 0,
    y: 672,
    width: 1491,
    height: 55,
    defaultFontSize: 36,
    minFontSize: 24,
    color: '#4F7DF3',
  },

  date: {
    x: 472,
    y: 934,
    width: 277,
    height: 34,
    fontSize: 20,
    color: '#17233C',
  },
};

export function calculateAdaptiveFontSize(
  text: string,
  defaultSize: number = 48,
  minSize: number = 26,
  maxCharsNormal: number = 18
): number {
  const len = text.trim().length;
  if (len <= maxCharsNormal) {
    return defaultSize;
  }
  const reduced = defaultSize - (len - maxCharsNormal) * 0.9;
  return Math.max(minSize, Math.round(reduced));
}

export function getSanitizedFilename(courseName: string): string {
  const sanitizedCourse = courseName.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  return `CodeKids-${sanitizedCourse}-Certificate.pdf`;
}
