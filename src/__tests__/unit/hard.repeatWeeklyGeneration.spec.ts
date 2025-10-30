import { describe, it, expect } from 'vitest';

import { EventForm } from '../../types';
import { generateWeeklyInstances } from '../../utils/repeatSchedule.ts';

describe('반복 일정 - 매주 생성', () => {
  const baseEvent: EventForm = {
    title: '주간 미팅',
    date: '2025-10-01', // 수요일
    startTime: '09:00',
    endTime: '10:00',
    description: '매주 반복되는 미팅',
    location: '회의실 A',
    category: '업무',
    repeat: {
      type: 'weekly',
      interval: 1,
      endDate: '2025-10-29',
    },
    notificationTime: 10,
  };

  describe('시나리오 1: 종료일이 명시된 경우 매주 동일 요일에 인스턴스 생성', () => {
    it('시작일과 같은 요일로 매주 인스턴스가 생성되어야 한다 (2025-10-01(수)부터 2025-10-29까지)', () => {
      // Arrange
      const event = { ...baseEvent };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      // 10/1(수), 10/8(수), 10/15(수), 10/22(수), 10/29(수) = 5개
      expect(instances).toHaveLength(5);
      expect(instances[0].date).toBe('2025-10-01');
      expect(instances[1].date).toBe('2025-10-08');
      expect(instances[2].date).toBe('2025-10-15');
      expect(instances[3].date).toBe('2025-10-22');
      expect(instances[4].date).toBe('2025-10-29');
    });

    it('각 인스턴스는 날짜를 제외한 모든 속성이 동일해야 한다', () => {
      // Arrange
      const event = { ...baseEvent };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      instances.forEach((instance) => {
        expect(instance.title).toBe(baseEvent.title);
        expect(instance.startTime).toBe(baseEvent.startTime);
        expect(instance.endTime).toBe(baseEvent.endTime);
        expect(instance.description).toBe(baseEvent.description);
        expect(instance.location).toBe(baseEvent.location);
        expect(instance.category).toBe(baseEvent.category);
      });
    });

    it('생성된 모든 인스턴스는 동일한 요일이어야 한다', () => {
      // Arrange
      const event = { ...baseEvent };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      const startDayOfWeek = new Date('2025-10-01').getDay(); // 수요일 = 3
      instances.forEach((instance) => {
        const instanceDate = new Date(instance.date);
        expect(instanceDate.getDay()).toBe(startDayOfWeek);
      });
    });
  });

  describe('시나리오 2: 종료일이 없는 경우 시스템 최대 기간까지 생성', () => {
    it('종료일이 없으면 시작일로부터 365일 후까지 매주 인스턴스를 생성해야 한다', () => {
      // Arrange
      const event: EventForm = {
        ...baseEvent,
        date: '2025-01-01', // 수요일
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: undefined,
        },
      };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      // 365일 / 7일 = 52주 + 1일 = 53개 인스턴스
      expect(instances).toHaveLength(53);
      expect(instances[0].date).toBe('2025-01-01');
      expect(instances[instances.length - 1].date).toBe('2025-12-31');
    });

    it('종료일이 없는 경우에도 모든 인스턴스는 동일한 요일이어야 한다', () => {
      // Arrange
      const event: EventForm = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: undefined,
        },
      };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      const startDayOfWeek = new Date('2025-01-01').getDay();
      instances.forEach((instance) => {
        const instanceDate = new Date(instance.date);
        expect(instanceDate.getDay()).toBe(startDayOfWeek);
      });
    });
  });

  describe('시나리오 3: 하나만 생성 (시작일 = 종료일)', () => {
    it('시작일과 종료일이 같으면 1개의 인스턴스만 생성해야 한다', () => {
      // Arrange
      const event: EventForm = {
        ...baseEvent,
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-10-01',
        },
      };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      expect(instances).toHaveLength(1);
      expect(instances[0].date).toBe('2025-10-01');
    });
  });

  describe('시나리오 4: 종료일이 다음 주 직전인 경우', () => {
    it('종료일이 다음 주 발생 전이면 시작일만 포함되어야 한다', () => {
      // Arrange
      const event: EventForm = {
        ...baseEvent,
        date: '2025-10-01', // 수요일
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-10-07', // 다음 수요일 전날
        },
      };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      expect(instances).toHaveLength(1);
      expect(instances[0].date).toBe('2025-10-01');
    });
  });

  describe('경계 조건 테스트', () => {
    it('시작일이 종료일보다 늦으면 빈 배열을 반환해야 한다', () => {
      // Arrange
      const event: EventForm = {
        ...baseEvent,
        date: '2025-10-15',
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-10-01',
        },
      };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      expect(instances).toHaveLength(0);
    });

    it('월경계를 넘어가는 경우에도 정확한 요일로 생성되어야 한다', () => {
      // Arrange
      const event: EventForm = {
        ...baseEvent,
        date: '2025-10-29', // 수요일
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-11-19', // 다음 달
        },
      };

      // Act
      const instances = generateWeeklyInstances(event);

      // Assert
      // 10/29(수), 11/5(수), 11/12(수), 11/19(수) = 4개
      expect(instances).toHaveLength(4);
      expect(instances[0].date).toBe('2025-10-29');
      expect(instances[1].date).toBe('2025-11-05');
      expect(instances[2].date).toBe('2025-11-12');
      expect(instances[3].date).toBe('2025-11-19');

      // 모두 수요일인지 확인
      instances.forEach((instance) => {
        const instanceDate = new Date(instance.date);
        expect(instanceDate.getDay()).toBe(3); // 수요일
      });
    });
  });
});
