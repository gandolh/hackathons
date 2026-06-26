export type Message = {
  msgDate: string;
  msgSender: string;
  msgContent: string;
};

export type ComparisonStat = {
  title: string;
  youValue: string;
  otherValue: string;
  youLabel: string;
  otherLabel: string;
};

export type DashboardData = {
  comparisons: ComparisonStat[];
  topWords: {
    you: { word: string; count: number }[];
    other: { word: string; count: number }[];
  };
  messagesPerMonth: {
    months: string[];
    you: number[];
    other: number[];
  };
  redFlags: string[];
};

export type User = {
  id: number;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
