import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen, within, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { SnackbarProvider } from 'notistack';
import { ReactElement } from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import App from '../../App';
import { server } from '../../setupTests';

const theme = createTheme();

const setup = (element: ReactElement) => {
  const user = userEvent.setup();

  return {
    ...render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>{element}</SnackbarProvider>
      </ThemeProvider>
    ),
    user,
  };
};

/**
 * Epic: 01_repeat-schedule (반복 일정 관리)
 *
 * 이 파일은 반복 일정 기능의 통합 테스트를 포함합니다.
 * 각 Story의 기능이 App.tsx와 정상적으로 통합되어 작동하는지 검증합니다.
 */
describe('Epic 01: 반복 일정 관리 - 통합 테스트', () => {
  /**
   * Story S01: 매일 반복 일정 생성
   *
   * 검증 항목:
   * - 사용자가 매일 반복 일정을 생성할 수 있다
   * - 생성된 반복 일정이 캘린더 뷰에 표시된다
   * - 반복 일정 인스턴스들이 검색 가능하다
   */
  describe('Story S01: 매일 반복 일정 생성', () => {
    describe('INT-S01-001: 매일 반복 일정이 캘린더에 표시됨', () => {
      beforeEach(() => {
        // Mock: 매일 반복되는 일정 인스턴스들을 서버가 반환
        server.use(
          http.post('/api/events', async () => {
            // 일정 생성 성공
            return HttpResponse.json({ success: true });
          }),
          http.get('/api/events', () => {
            // 2025-10-01부터 2025-10-05까지 매일 반복되는 일정 인스턴스들
            return HttpResponse.json({
              events: [
                {
                  id: '1',
                  title: '매일 스탠드업 미팅',
                  date: '2025-10-01',
                  startTime: '09:00',
                  endTime: '09:30',
                  description: '매일 진행되는 스탠드업',
                  location: '회의실 A',
                  category: '업무',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-05' },
                  notificationTime: 10,
                },
                {
                  id: '2',
                  title: '매일 스탠드업 미팅',
                  date: '2025-10-02',
                  startTime: '09:00',
                  endTime: '09:30',
                  description: '매일 진행되는 스탠드업',
                  location: '회의실 A',
                  category: '업무',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-05' },
                  notificationTime: 10,
                },
                {
                  id: '3',
                  title: '매일 스탠드업 미팅',
                  date: '2025-10-03',
                  startTime: '09:00',
                  endTime: '09:30',
                  description: '매일 진행되는 스탠드업',
                  location: '회의실 A',
                  category: '업무',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-05' },
                  notificationTime: 10,
                },
                {
                  id: '4',
                  title: '매일 스탠드업 미팅',
                  date: '2025-10-04',
                  startTime: '09:00',
                  endTime: '09:30',
                  description: '매일 진행되는 스탠드업',
                  location: '회의실 A',
                  category: '업무',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-05' },
                  notificationTime: 10,
                },
                {
                  id: '5',
                  title: '매일 스탠드업 미팅',
                  date: '2025-10-05',
                  startTime: '09:00',
                  endTime: '09:30',
                  description: '매일 진행되는 스탠드업',
                  location: '회의실 A',
                  category: '업무',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-05' },
                  notificationTime: 10,
                },
              ],
            });
          })
        );
      });

      afterEach(() => {
        server.resetHandlers();
      });

      it('매일 반복 일정이 생성되면 이벤트 리스트에 여러 인스턴스가 표시된다', async () => {
        // Given: 앱이 로드됨
        setup(<App />);

        // When: 일정이 로드됨
        await screen.findByText('일정 로딩 완료!');

        // Then: 5개의 매일 반복 일정 인스턴스가 이벤트 리스트에 표시됨
        const eventList = within(screen.getByTestId('event-list'));
        const eventTitles = eventList.getAllByText('매일 스탠드업 미팅');
        expect(eventTitles).toHaveLength(5);

        // And: 각 날짜별로 인스턴스가 표시됨
        expect(eventList.getByText('2025-10-01')).toBeInTheDocument();
        expect(eventList.getByText('2025-10-02')).toBeInTheDocument();
        expect(eventList.getByText('2025-10-03')).toBeInTheDocument();
        expect(eventList.getByText('2025-10-04')).toBeInTheDocument();
        expect(eventList.getByText('2025-10-05')).toBeInTheDocument();
      });

      it('월별 뷰에서 매일 반복 일정이 각 날짜 셀에 표시된다', async () => {
        // Given: 앱이 로드되고 월별 뷰가 선택됨
        setup(<App />);
        await screen.findByText('일정 로딩 완료!');

        // When: 월별 뷰 확인
        const monthView = screen.getByTestId('month-view');

        // Then: 매일 반복 일정이 여러 날짜에 표시됨
        const eventInMonthView = within(monthView).getAllByText('매일 스탠드업 미팅');
        expect(eventInMonthView.length).toBeGreaterThanOrEqual(5);
      });

      it('주별 뷰에서 해당 주의 매일 반복 일정이 표시된다', async () => {
        // Given: 앱이 로드됨
        const { user } = setup(<App />);
        await screen.findByText('일정 로딩 완료!');

        // When: 주별 뷰로 전환
        await user.click(within(screen.getByLabelText('뷰 타입 선택')).getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: 'week-option' }));

        // Then: 주별 뷰에 매일 반복 일정이 표시됨
        const weekView = screen.getByTestId('week-view');
        const eventsInWeek = within(weekView).getAllByText('매일 스탠드업 미팅');
        expect(eventsInWeek.length).toBeGreaterThan(0);
      });
    });

    describe('INT-S01-002: 매일 반복 일정이 검색에서 정상 작동함', () => {
      beforeEach(() => {
        server.use(
          http.get('/api/events', () => {
            return HttpResponse.json({
              events: [
                {
                  id: '1',
                  title: '매일 운동',
                  date: '2025-10-01',
                  startTime: '07:00',
                  endTime: '08:00',
                  description: '매일 아침 운동',
                  location: '헬스장',
                  category: '개인',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-05' },
                  notificationTime: 10,
                },
                {
                  id: '2',
                  title: '매일 운동',
                  date: '2025-10-02',
                  startTime: '07:00',
                  endTime: '08:00',
                  description: '매일 아침 운동',
                  location: '헬스장',
                  category: '개인',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-05' },
                  notificationTime: 10,
                },
                {
                  id: '3',
                  title: '매일 운동',
                  date: '2025-10-03',
                  startTime: '07:00',
                  endTime: '08:00',
                  description: '매일 아침 운동',
                  location: '헬스장',
                  category: '개인',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-05' },
                  notificationTime: 10,
                },
                {
                  id: '10',
                  title: '주간 회의',
                  date: '2025-10-03',
                  startTime: '14:00',
                  endTime: '15:00',
                  description: '주간 업무 회의',
                  location: '회의실',
                  category: '업무',
                  repeat: { type: 'none', interval: 0 },
                  notificationTime: 10,
                },
              ],
            });
          })
        );
      });

      afterEach(() => {
        server.resetHandlers();
      });

      it('검색어로 매일 반복 일정을 검색하면 모든 인스턴스가 표시된다', async () => {
        // Given: 앱이 로드됨
        const { user } = setup(<App />);
        await screen.findByText('일정 로딩 완료!');

        // When: '매일 운동'으로 검색
        const searchInput = screen.getByPlaceholderText('검색어를 입력하세요');
        await user.type(searchInput, '매일 운동');

        // Then: 매일 반복 일정의 모든 인스턴스가 표시됨
        const eventList = within(screen.getByTestId('event-list'));
        const searchResults = eventList.getAllByText('매일 운동');
        expect(searchResults).toHaveLength(3);

        // And: 다른 일정은 표시되지 않음
        expect(eventList.queryByText('주간 회의')).not.toBeInTheDocument();
      });

      it('검색어를 지우면 반복 일정을 포함한 모든 일정이 다시 표시된다', async () => {
        // Given: 검색어로 필터링된 상태
        const { user } = setup(<App />);
        await screen.findByText('일정 로딩 완료!');

        const searchInput = screen.getByPlaceholderText('검색어를 입력하세요');
        await user.type(searchInput, '매일 운동');

        // When: 검색어 삭제
        await user.clear(searchInput);

        // Then: 모든 일정이 다시 표시됨
        const eventList = within(screen.getByTestId('event-list'));
        expect(eventList.getAllByText('매일 운동')).toHaveLength(3);
        expect(eventList.getByText('주간 회의')).toBeInTheDocument();
      });
    });

    describe('INT-S01-003: 매일 반복 일정과 다른 기능의 상호작용', () => {
      beforeEach(() => {
        server.use(
          http.get('/api/events', () => {
            return HttpResponse.json({
              events: [
                {
                  id: '1',
                  title: '매일 알람 테스트',
                  date: '2025-10-15',
                  startTime: '09:00',
                  endTime: '09:30',
                  description: '알람 테스트',
                  location: '사무실',
                  category: '업무',
                  repeat: { type: 'daily', interval: 1, endDate: '2025-10-17' },
                  notificationTime: 10,
                },
              ],
            });
          })
        );
      });

      afterEach(() => {
        server.resetHandlers();
      });

      it('매일 반복 일정도 알림 기능이 정상 작동한다', async () => {
        // Given: 10분 전 시간으로 설정
        vi.setSystemTime(new Date('2025-10-15 08:49:59'));

        // When: 앱 로드
        setup(<App />);
        await screen.findByText('일정 로딩 완료!');

        // Then: 알림이 표시되지 않음 (아직 10분 전이 아님)
        expect(screen.queryByText(/매일 알람 테스트.*시작됩니다/)).not.toBeInTheDocument();

        // When: 1초 경과하여 정확히 10분 전이 됨
        act(() => {
          vi.advanceTimersByTime(1000);
        });

        // Then: 알림이 표시됨
        expect(
          await screen.findByText(/10분 후 매일 알람 테스트 일정이 시작됩니다/)
        ).toBeInTheDocument();
      });
    });
  });

  /**
   * 향후 추가될 Story들의 통합 테스트
   *
   * - Story S02: 매주 반복 일정 생성
   * - Story S03: 매월 31일 규칙
   * - Story S04: 매년 윤일 규칙
   * - Story S05: 반복 아이콘 시각화
   * - Story S06: 종료일 기준 반복
   * - Story S07: 단일 인스턴스 수정
   * - Story S08: 전체 인스턴스 수정
   * - Story S09: 단일 인스턴스 삭제
   * - Story S10: 전체 인스턴스 삭제
   */
});
