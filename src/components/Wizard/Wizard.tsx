import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWizard } from '../../context/WizardContext';
import { useAuth } from '../../context/AuthContext';
import CharactersStep from './steps/CharactersStep';
import StoryStep from './steps/StoryStep';
import DesignStep from './steps/DesignStep';
import PreviewStep from './steps/PreviewStep';
import DedicatoriaChoiceStep from './steps/DedicatoriaChoiceStep';
import DedicatoriaStep from './steps/DedicatoriaStep';
import ExportStep from './steps/ExportStep';
import WizardNav from './WizardNav';
import StepIndicator from './StepIndicator';

const Wizard: React.FC = () => {
  const { currentStep } = useWizard();
  const { storyId } = useParams();
  const navigate = useNavigate();
  const { supabase } = useAuth();

  useEffect(() => {
    sessionStorage.removeItem('skipWizardCleanup');
  }, []);

  useEffect(() => {
    if (!storyId) {
      navigate('/');
    }
  }, [storyId, navigate]);

  // Reset scroll to top when step changes (improves UX navigation)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    return () => {
      const cleanup = async () => {
        if (!storyId) return;
        const skip = sessionStorage.getItem('skipWizardCleanup');
        sessionStorage.removeItem('skipWizardCleanup');
        if (skip === 'true') return;
        
        // Check if user has interacted with character selection
        const hasInteractedWithCharacters = sessionStorage.getItem(`character_interaction_${storyId}`);
        if (!hasInteractedWithCharacters) {
          console.log('[Wizard] Skipping cleanup - user hasn\'t interacted with character selection yet');
          return;
        }
        
        const { data } = await supabase
          .from('story_characters')
          .select('character_id')
          .eq('story_id', storyId);
        if (!data || data.length === 0) {
          console.log('[Wizard] Cleaning up story with no characters:', storyId);
          await supabase.rpc('delete_full_story', { story_id: storyId });
        }
      };
      cleanup();
    };
  }, [storyId, supabase]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (!storyId) return;
      
      // Check if user has interacted with character selection
      const hasInteractedWithCharacters = sessionStorage.getItem(`character_interaction_${storyId}`);
      if (!hasInteractedWithCharacters) {
        console.log('[Wizard] Skipping beforeunload cleanup - user hasn\'t interacted with character selection yet');
        return;
      }
      
      const { data } = await supabase
        .from('story_characters')
        .select('character_id')
        .eq('story_id', storyId);
      if (!data || data.length === 0) {
        console.log('[Wizard] Cleaning up story on beforeunload:', storyId);
        await supabase.rpc('delete_full_story', { story_id: storyId });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [storyId, supabase]);

  const renderStep = () => {
    switch (currentStep) {
      case 'characters':
        return <CharactersStep />;
      case 'story':
        return <StoryStep />;
      case 'design':
        return <DesignStep />;
      case 'preview':
        return <PreviewStep />;
      case 'dedicatoria-choice':
        return <DedicatoriaChoiceStep />;
      case 'dedicatoria':
        return <DedicatoriaStep />;
      case 'export':
        return <ExportStep />;
      default:
        return <CharactersStep />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 mb-8">
      <StepIndicator />
      <div className="p-6">
        {renderStep()}
      </div>
      <WizardNav />
    </div>
  );
};

export default Wizard;