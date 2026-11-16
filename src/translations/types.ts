export type CourseKind = 'course' | 'lecture' | 'stay' | 'award' | 'live'

export interface CourseItem {
  /** null when the date is not known. */
  year: number | null
  kind: CourseKind
  title: string
  subtitle: string
  place?: string
  topic?: string
  international?: boolean
}
