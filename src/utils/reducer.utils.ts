import { AnyAction } from "redux";
// ! Creating a matchable function
// What is the purpose of this function?
// This function is used to create a matchable function
// What is a matchable function?
// A matchable function is a function that has a match method
// What is the match method?
// The match method is a method that takes an action and returns a boolean
// What is the purpose of the match method?
// The purpose of the match method is to check if the action is of the same type as the action creator
// Why is this useful?
// This is useful because it allows you to write code like this:
// What is the purpose of the code below?
// The purpose of the code below is to check if the action is of the same type as the action creator

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// ! Writing code for function overloading in typescript
// ! In order to overload functions in typescript you need to have same number of parameters
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
