class AppEvents extends EventTarget {}
export const appEvents = new AppEvents();

export type Word = {
  id: number;
  title: string;
};

