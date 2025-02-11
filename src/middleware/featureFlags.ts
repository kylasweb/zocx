import { Request, Response, NextFunction } from 'express';
import { FeatureFlags } from '../contexts/FeatureFlags';

export const featureFlagMiddleware = (feature: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const features: FeatureFlags = req.app.locals.features;
    
    if (!features[feature]?.enabled) {
      return res.status(403).json({ 
        error: 'This feature is currently disabled',
        documentation: features[feature]?.description 
      });
    }
    
    next();
  };
}; 