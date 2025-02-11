import { useFeatureFlags } from '../contexts/FeatureFlags';
import { Tooltip, TooltipTrigger, TooltipContent } from './shared/ui/tooltip';

const FeatureIndicator = ({ feature }: { feature: string }) => {
  const { getFeatureState } = useFeatureFlags();
  const enabled = getFeatureState(feature);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Tooltip>
        <TooltipTrigger>
          <div className={`h-3 w-3 rounded-full shadow-sm ${enabled ? 'bg-green-500' : 'bg-red-500'}`} />
        </TooltipTrigger>
        <TooltipContent>
          <p className="capitalize">{feature.replace(/([A-Z])/g, ' $1')} - {enabled ? 'Enabled' : 'Disabled'}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FeatureIndicator; 