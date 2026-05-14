export type ActionState = {
  status?: "ERROR" | "SUCCESS" | "ERROR2";
  message: string;
  payload?: any;
  fieldErrors?: Record<string, string[] | undefined>;
  timestamp?: number;
};
