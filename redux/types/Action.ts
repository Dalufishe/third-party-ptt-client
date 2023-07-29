type Action = {
  type: string;
  payload: any;
};

type ActionCreator = (...args: any) => Action;

export type { Action, ActionCreator };
