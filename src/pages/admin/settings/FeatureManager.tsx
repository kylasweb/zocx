import { Switch } from '../../components/ui';
import { useFeatureFlags } from '../../../contexts/FeatureFlags';
import FeatureAuditHistory from '../../../components/FeatureAuditHistory';

const FeatureManager = () => {
  const { features, toggleFeature } = useFeatureFlags();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(features).map(([key, config]) => (
          <div key={key} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                <p className="text-sm text-gray-600">{config.description}</p>
                {config.lastModified && (
                  <p className="text-xs text-gray-500 mt-1">
                    Last modified: {new Date(config.lastModified).toLocaleString()}
                    {config.modifiedBy && ` by ${config.modifiedBy}`}
                  </p>
                )}
              </div>
              <Switch
                checked={config.enabled}
                onCheckedChange={() => toggleFeature(key)}
              />
            </div>
          </div>
        ))}
      </div>
      
      <FeatureAuditHistory />
    </div>
  );
};

export default FeatureManager; 