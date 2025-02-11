import React, { useEffect, useState } from 'react';
import { useFeatureFlags } from '../contexts/FeatureFlags';
import { Badge } from './shared/ui/badge';
import { format } from 'date-fns';

const FeatureAuditHistory = () => {
  const { features } = useFeatureFlags();

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Feature Change History</h3>
      <div className="space-y-3">
        {Object.entries(features).map(([key, config]) => (
          config.lastModified && (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium capitalize">{key}</p>
                <p className="text-sm text-gray-600">
                  {config.modifiedBy} - {format(config.lastModified, 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <Badge variant={config.enabled ? 'success' : 'destructive'}>
                {config.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default FeatureAuditHistory; 