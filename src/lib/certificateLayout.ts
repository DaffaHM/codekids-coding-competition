export const CERTIFICATE_LAYOUT = {
  page: {
    width: 1528,
    height: 997,
  },
  templateUrl: '/certificates/codekids-certificate1.png',

  name: {
    x: 0,
    y: 420,
    width: 1528,
    height: 75,
    defaultFontSize: 46,
    minFontSize: 24,
    color: '#17233C',
  },

  course: {
    x: 0,
    y: 635,
    width: 1528,
    height: 60,
    defaultFontSize: 34,
    minFontSize: 22,
    color: '#4F7DF3',
  },

  date: {
    x: 460,
    y: 885,
    width: 320,
    height: 30,
    fontSize: 18,
    color: '#17233C',
  },
};

export function calculateAdaptiveFontSize(
  text: string,
  defaultSize: number = 46,
  minSize: number = 24,
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
