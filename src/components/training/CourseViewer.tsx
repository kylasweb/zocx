import React, { useState } from 'react';
import { Play, FileText, CheckCircle, Book, Clock } from 'lucide-react';
import { Training } from '../../types/training';

interface CourseViewerProps {
  training: Training;
  onComplete: () => void;
  onProgress: (progress: number) => void;
}

const CourseViewer: React.FC<CourseViewerProps> = ({
  training,
  onComplete,
  onProgress,
}) => {
  const [currentSection, setCurrentSection] = useState(0);

  const handleSectionComplete = () => {
    const newProgress = ((currentSection + 1) / training.sections.length) * 100;
    onProgress(newProgress);
    
    if (currentSection + 1 >= training.sections.length) {
      onComplete();
    } else {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{training.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{training.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">
              {Math.ceil(training.duration / 60)} minutes
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className="flex-1">
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${training.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 text-sm text-gray-500">
            {training.progress}% Complete
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Viewer */}
          <div className="lg:col-span-2 space-y-6">
            {training.type === 'video' && (
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                <Play className="h-12 w-12 text-gray-400" />
              </div>
            )}
            {training.type === 'document' && (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: training.content }} />
              </div>
            )}
            {training.type === 'quiz' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Assessment</h3>
                {/* Quiz implementation */}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleSectionComplete}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {currentSection + 1 >= training.sections.length ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Training
                  </>
                ) : (
                  'Next Section'
                )}
              </button>
            </div>
          </div>

          {/* Course Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Course Content</h3>
            <div className="space-y-2">
              {training.sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    currentSection === index
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {section.type === 'video' && <Play className="h-5 w-5" />}
                    {section.type === 'document' && <FileText className="h-5 w-5" />}
                    {section.type === 'quiz' && <Book className="h-5 w-5" />}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{section.title}</p>
                    <p className="text-xs text-gray-500">{section.duration} min</p>
                  </div>
                  {section.completed && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;