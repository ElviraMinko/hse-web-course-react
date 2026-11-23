import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { initialState } from '../data/initialData';
import { reducer } from './reducer';

const STORAGE_KEY = 'sprint-tracker-state-v1';

const StateContext = createContext(null);
const ActionsContext = createContext(null);

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

export function AppStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const actions = useMemo(
    () => ({
      createTask: (payload) => dispatch({ type: 'task/create', payload }),
      updateTask: (id, payload) => dispatch({ type: 'task/update', id, payload }),
      setTaskStatus: (id, status) => dispatch({ type: 'task/update', id, payload: { status } }),
      addComment: (id, comment) => dispatch({ type: 'task/comment', id, comment }),
      inviteMember: (payload) => dispatch({ type: 'member/invite', payload }),
      setMemberRole: (id, role) => dispatch({ type: 'member/role', id, role }),
      removeMember: (id) => dispatch({ type: 'member/remove', id }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [],
  );

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
    </StateContext.Provider>
  );
}

export function useAppState() {
  return useContext(StateContext);
}

export function useAppActions() {
  return useContext(ActionsContext);
}

export function useMembersById() {
  const { members } = useAppState();
  return useMemo(() => Object.fromEntries(members.map((m) => [m.id, m])), [members]);
}

export function useAllTags(defaultTags) {
  const { tasks } = useAppState();
  return useMemo(() => {
    const set = new Set(defaultTags);
    tasks.forEach((t) => t.tags.forEach((tag) => set.add(tag)));
    return [...set];
  }, [tasks, defaultTags]);
}
