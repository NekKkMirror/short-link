import Express from 'express';

export interface IHandler {
  registerRoutes: (root: Express.Router) => void;
}
