import { AVATAR_COLORS } from '../data/constants';
import { initialState } from '../data/initialData';

export function reducer(state, action) {
  switch (action.type) {
    case 'task/create': {
      const number = state.nextTaskNumber;
      const task = {
        ...action.payload,
        id: `spr-${number}`,
        code: `SPR-${number}`,
        comments: [],
      };
      return { ...state, tasks: [...state.tasks, task], nextTaskNumber: number + 1 };
    }

    case 'task/update':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, ...action.payload } : task,
        ),
      };

    case 'task/comment':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, comments: [...task.comments, action.comment] } : task,
        ),
      };

    case 'member/invite': {
      const color = AVATAR_COLORS[state.members.length % AVATAR_COLORS.length];
      const member = {
        id: `m-${Date.now()}`,
        role: 'member',
        activity: 'приглашён',
        color,
        ...action.payload,
      };
      return { ...state, members: [...state.members, member] };
    }

    case 'member/role':
      return {
        ...state,
        members: state.members.map((m) => (m.id === action.id ? { ...m, role: action.role } : m)),
      };

    case 'member/remove':
      return {
        ...state,
        members: state.members.filter((m) => m.id !== action.id),
        tasks: state.tasks.map((t) => (t.assigneeId === action.id ? { ...t, assigneeId: null } : t)),
      };

    case 'reset':
      return initialState;

    default:
      return state;
  }
}
