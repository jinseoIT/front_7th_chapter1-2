import { describe, it, expect } from 'vitest';
import { generateDailyInstances } from '../../utils/repeatSchedule';
import { EventForm } from '../../types';

describe('Story S01: 매일 반복 일정 생성', () => {
  const baseEvent: EventForm = {
    title: '매일 미팅',
    date: '2025-10-01',
    startTime: '09:00',
    endTime: '10:00',
    description: '일일 스탠드업 미팅',
    location: '회의실',
    category: '업무',
    repeat: {
      type: 'daily',
      interval: 1,
    },
    notificationTime: 10,
  };

  describe('AC1: 매일 선택 시 시작일부터 종료일까지 날짜별 인스턴스가 모두 생성된다', () => {
    it('시작일 2025-10-01, 종료일 2025-10-05인 경우 총 5개 인스턴스가 생성되어야 한다', () => {
      // Given: 10월 1일부터 10월 5일까지 매일 반복되는 일정
      const event: EventForm = {
        ...baseEvent,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-10-05',
        },
      };

      // When: 매일 인스턴스 생성
      const instances = generateDailyInstances(event);

      // Then: 5개의 인스턴스가 생성됨
      expect(instances).toHaveLength(5);
      expect(instances[0].date).toBe('2025-10-01');
      expect(instances[1].date).toBe('2025-10-02');
      expect(instances[2].date).toBe('2025-10-03');
      expect(instances[3].date).toBe('2025-10-04');
      expect(instances[4].date).toBe('2025-10-05');
    });

    it('각 인스턴스는 원본 이벤트의 속성을 유지해야 한다', () => {
      // Given: 종료일이 지정된 매일 반복 일정
      const event: EventForm = {
        ...baseEvent,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-10-03',
        },
      };

      // When: 매일 인스턴스 생성
      const instances = generateDailyInstances(event);

      // Then: 모든 인스턴스가 원본 속성 유지
      instances.forEach((instance) => {
        expect(instance.title).toBe(baseEvent.title);
        expect(instance.startTime).toBe(baseEvent.startTime);
        expect(instance.endTime).toBe(baseEvent.endTime);
        expect(instance.description).toBe(baseEvent.description);
        expect(instance.location).toBe(baseEvent.location);
        expect(instance.category).toBe(baseEvent.category);
        expect(instance.notificationTime).toBe(baseEvent.notificationTime);
      });
    });

    it('종료일이 시작일보다 이전인 경우 빈 배열을 반환해야 한다', () => {
      // Given: 종료일이 시작일보다 이전인 잘못된 일정
      const event: EventForm = {
        ...baseEvent,
        date: '2025-10-10',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-10-05',
        },
      };

      // When: 매일 인스턴스 생성 시도
      const instances = generateDailyInstances(event);

      // Then: 빈 배열 반환
      expect(instances).toHaveLength(0);
    });
  });

  describe('AC2: 종료일이 미지정인 경우 시스템 최대 기간까지 생성된다', () => {
    it('종료일이 없으면 시작일로부터 365일간 인스턴스가 생성되어야 한다', () => {
      // Given: 종료일이 지정되지 않은 매일 반복 일정
      const event: EventForm = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'daily',
          interval: 1,
          // endDate 없음
        },
      };

      // When: 매일 인스턴스 생성
      const instances = generateDailyInstances(event);

      // Then: 366개의 인스턴스가 생성됨 (2025는 평년, 2026-01-01까지)
      expect(instances).toHaveLength(366);
      expect(instances[0].date).toBe('2025-01-01');
      expect(instances[instances.length - 1].date).toBe('2026-01-01');
    });

    it('종료일이 undefined인 경우도 365일간 생성되어야 한다', () => {
      // Given: 종료일이 명시적으로 undefined인 일정
      const event: EventForm = {
        ...baseEvent,
        date: '2025-06-01',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: undefined,
        },
      };

      // When: 매일 인스턴스 생성
      const instances = generateDailyInstances(event);

      // Then: 366개의 인스턴스가 생성됨
      expect(instances).toHaveLength(366);
      expect(instances[0].date).toBe('2025-06-01');
    });
  });

  describe('AC3: 다른 반복 규칙과 혼동되지 않는다', () => {
    it('interval이 1이 아니어도 매일 1일씩 증가해야 한다', () => {
      // Given: interval이 다른 값으로 설정된 매일 반복 일정
      const event: EventForm = {
        ...baseEvent,
        repeat: {
          type: 'daily',
          interval: 7, // interval 무시되어야 함
          endDate: '2025-10-05',
        },
      };

      // When: 매일 인스턴스 생성
      const instances = generateDailyInstances(event);

      // Then: 여전히 매일 생성됨 (interval 무시)
      expect(instances).toHaveLength(5);
      expect(instances[0].date).toBe('2025-10-01');
      expect(instances[1].date).toBe('2025-10-02');
    });
  });

  describe('Edge Cases: 경계 조건 테스트', () => {
    it('시작일과 종료일이 같은 경우 1개의 인스턴스만 생성되어야 한다', () => {
      // Given: 시작일과 종료일이 동일한 일정
      const event: EventForm = {
        ...baseEvent,
        date: '2025-10-01',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-10-01',
        },
      };

      // When: 매일 인스턴스 생성
      const instances = generateDailyInstances(event);

      // Then: 1개의 인스턴스만 생성
      expect(instances).toHaveLength(1);
      expect(instances[0].date).toBe('2025-10-01');
    });

    it('월을 넘어가는 경우에도 정확히 생성되어야 한다', () => {
      // Given: 10월 말부터 11월 초까지 반복되는 일정
      const event: EventForm = {
        ...baseEvent,
        date: '2025-10-30',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-11-03',
        },
      };

      // When: 매일 인스턴스 생성
      const instances = generateDailyInstances(event);

      // Then: 월 경계를 넘어서도 정확히 생성됨
      expect(instances).toHaveLength(5);
      expect(instances[0].date).toBe('2025-10-30');
      expect(instances[1].date).toBe('2025-10-31');
      expect(instances[2].date).toBe('2025-11-01');
      expect(instances[3].date).toBe('2025-11-02');
      expect(instances[4].date).toBe('2025-11-03');
    });

    it('연을 넘어가는 경우에도 정확히 생성되어야 한다', () => {
      // Given: 12월 말부터 1월 초까지 반복되는 일정
      const event: EventForm = {
        ...baseEvent,
        date: '2025-12-30',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2026-01-02',
        },
      };

      // When: 매일 인스턴스 생성
      const instances = generateDailyInstances(event);

      // Then: 연 경계를 넘어서도 정확히 생성됨
      expect(instances).toHaveLength(4);
      expect(instances[0].date).toBe('2025-12-30');
      expect(instances[1].date).toBe('2025-12-31');
      expect(instances[2].date).toBe('2026-01-01');
      expect(instances[3].date).toBe('2026-01-02');
    });
  });
});
