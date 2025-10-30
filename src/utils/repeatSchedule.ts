import { EventForm } from '../types';

/**
 * 반복 일정 생성 시 기본 최대 기간 (365일)
 */
const DEFAULT_MAX_DAYS = 365;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환합니다.
 */
function formatDateToString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 종료일을 계산합니다. 명시적 종료일이 없으면 시작일로부터 365일 후를 반환합니다.
 */
function calculateEndDate(startDate: Date, endDateString?: string): Date {
  if (endDateString) {
    return new Date(endDateString);
  }
  return new Date(startDate.getTime() + DEFAULT_MAX_DAYS * MILLISECONDS_PER_DAY);
}

/**
 * 반복 일정 인스턴스를 생성하는 공통 로직입니다.
 * @param event - 반복 일정 정보를 포함한 이벤트
 * @param dayIncrement - 날짜 증가 간격 (일 단위)
 * @returns 생성된 일정 인스턴스 배열
 */
function generateRepeatInstances(event: EventForm, dayIncrement: number): EventForm[] {
  const instances: EventForm[] = [];
  const startDate = new Date(event.date);
  const endDate = calculateEndDate(startDate, event.repeat.endDate);

  if (startDate > endDate) {
    return instances;
  }

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    instances.push({
      ...event,
      date: formatDateToString(currentDate),
    });

    currentDate.setDate(currentDate.getDate() + dayIncrement);
  }

  return instances;
}

/**
 * 매일 반복되는 일정 인스턴스를 생성합니다.
 * @param event - 반복 일정 정보를 포함한 이벤트
 * @returns 생성된 일정 인스턴스 배열
 */
export function generateDailyInstances(event: EventForm): EventForm[] {
  return generateRepeatInstances(event, 1);
}

/**
 * 매주 반복되는 일정 인스턴스를 생성합니다.
 * 시작일과 동일한 요일에 주 단위로 인스턴스가 생성됩니다.
 * @param event - 반복 일정 정보를 포함한 이벤트
 * @returns 생성된 일정 인스턴스 배열
 */
export function generateWeeklyInstances(event: EventForm): EventForm[] {
  return generateRepeatInstances(event, 7);
}
