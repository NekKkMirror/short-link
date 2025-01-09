declare global {
  namespace Express {
    interface Request {
      validatedIp?: string;
    }
  }
}

export {};
