// RED PHASE: expected to fail
import { describe, it, expect } from 'vitest';

import { EventForm } from '../../types';
import { generateDailyInstances } from '../../utils/repeatSchedule.ts';

describe('반복 일정 - 매일 생성', () => {
  const baseEvent: EventForm = {
    title: '데일리 미팅',
    date: '2025-10-01',
    startTime: '09:00',
    endTime: '10:00',
    description: '매일 반복되는 미팅',
    location: '회의실 A',
    category: '업무',
    repeat: {
      type: 'daily',
      interval: 1,
      endDate: '2025-10-05',
    },
    notificationTime: 10,
  };

  describe('시나리오 1: 종료일이 명시된 경우 매일 인스턴스 생성', () => {
    it('시작일부터 종료일까지 매일 인스턴스가 생성되어야 한다', () => {
      // Arrange
      const event = { ...baseEvent };

      // Act
      const instances = generateDailyInstances(event);

      // Assert
      expect(instances).toHaveLength(5);
      expect(instances[0].date).toBe('2025-10-01');
      expect(instances[1].date).toBe('2025-10-02');
      expect(instances[2].date).toBe('2025-10-03');
      expect(instances[3].date).toBe('2025-10-04');
      expect(instances[4].date).toBe('2025-10-05');
    });

    it('각 인스턴스는 날짜를 제외한 모든 속성이 동일해야 한다', () => {
      // Arrange
      const event = { ...baseEvent };

      // Act
      const instances = generateDailyInstances(event);

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
  });

  describe('시나리오 2: 종료일이 없는 경우 시스템 최대 기간까지 생성', () => {
    it('종료일이 없으면 시작일로부터 365일 후까지 인스턴스를 생성해야 한다', () => {
      // Arrange
      const event: EventForm = {
        ...baseEvent,
        date: '2025-12-29',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: undefined,
        },
      };

      // Act
      const instances = generateDailyInstances(event);

      // Assert
      expect(instances).toHaveLength(366); // 2025-12-29부터 366일
      expect(instances[0].date).toBe('2025-12-29');
      expect(instances[instances.length - 1].date).toBe('2026-12-29');
    });
  });

  describe('시나리오 3: 하루만 생성 (시작일 = 종료일)', () => {
    it('시작일과 종료일이 같으면 1개의 인스턴스만 생성해야 한다', () => {
      // Arrange
      const event: EventForm = {
        ...baseEvent,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-10-01',
        },
      };

      // Act
      const instances = generateDailyInstances(event);

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
        date: '2025-10-10',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-10-05',
        },
      };

      // Act
      const instances = generateDailyInstances(event);

      // Assert
      expect(instances).toHaveLength(0);
    });
  });
});
