import React, { useState } from 'react';
import { BookOpen, CheckCircle, PlayCircle, FileText, Award, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTrainingStore } from '../store/trainingStore';
import CourseCard from '../components/training/CourseCard';
import CourseViewer from '../components/training/CourseViewer';
import AssessmentQuiz from '../components/training/AssessmentQuiz';
import AchievementCard from '../components/training/AchievementCard';

const Training: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    trainings, 
    startTraining, 
    completeTraining, 
    updateProgress,
    getCompletedTrainings,
    getRequiredTrainings,
    getOptionalTrainings,
    getAchievements
  } = useTrainingStore();

  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!user) return null;

  const completedTrainings = getCompletedTrainings();
  const requiredTrainings = getRequiredTrainings();
  const optionalTrainings = getOptionalTrainings();
  const achievements = getAchievements();

  const stats = [
    {
      label: 'Completed Trainings',
      value: completedTrainings.length,
      total: trainings.length,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'Required Courses',
      value: requiredTrainings.filter(t => t.status === 'completed').length,
      total: requiredTrainings.length,
      icon: BookOpen,
      color: 'bg-red-500',
    },
    {
      label: 'Achievement Points',
      value: trainings.reduce((sum, t) => sum + (t.status === 'completed' ? t.points : 0), 0),
      icon: Award,
      color: 'bg-purple-500',
    },
  ];

  const handleStartTraining = (trainingId: string) => {
    startTraining(trainingId);
    setSelectedTraining(trainingId);
  };

  const handleCompleteTraining = () => {
    if (selectedTraining) {
      const training = trainings.find(t => t.id === selectedTraining);
      if (training?.type === 'quiz') {
        setShowQuiz(true);
      } else {
        completeTraining(selectedTraining);
        setSelectedTraining(null);
      }
    }
  };

  const handleQuizComplete = (score: number) => {
    if (selectedTraining && score >= 70) {
      completeTraining(selectedTraining);
    }
    setShowQuiz(false);
    setSelectedTraining(null);
  };

  const selectedTrainingData = trainings.find(t => t.id === selectedTraining);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Training Center</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                  {stat.total && <span className="text-gray-500 text-lg">/{stat.total}</span>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTrainingData ? (
        showQuiz ? (
          <AssessmentQuiz
            questions={[
              {
                id: '1',
                text: 'Sample question 1?',
                options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                correctAnswer: 0,
              },
              // Add more questions as needed
            ]}
            onComplete={handleQuizComplete}
            passingScore={70}
          />
        ) : (
          <CourseViewer
            training={selectedTrainingData}
            onComplete={handleCompleteTraining}
            onProgress={(progress) => updateProgress(selectedTrainingData.id, progress)}
          />
        )
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Required Training */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Training</h2>
              <div className="space-y-4">
                {requiredTrainings.map((training) => (
                  <CourseCard
                    key={training.id}
                    training={training}
                    onClick={() => handleStartTraining(training.id)}
                  />
                ))}
              </div>
            </div>

            {/* Optional Training */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Optional Training</h2>
              <div className="space-y-4">
                {optionalTrainings.map((training) => (
                  <CourseCard
                    key={training.id}
                    training={training}
                    onClick={() => handleStartTraining(training.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Achievements */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={completedTrainings.some(t => t.achievement?.id === achievement.id)}
                    progress={
                      trainings.find(t => t.achievement?.id === achievement.id)?.progress || 0
                    }
                  />
                ))}
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h2>
              <div className="space-y-4">
                {['video', 'document', 'quiz'].map((type) => {
                  const typeTrainings = trainings.filter(t => t.type === type);
                  const completed = typeTrainings.filter(t => t.status === 'completed').length;
                  const total = typeTrainings.length;
                  const progress = total > 0 ? (completed / total) * 100 : 0;

                  return (
                    <div key={type}>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <div className="flex items-center">
                          {type === 'video' && <PlayCircle className="h-4 w-4 mr-2 text-blue-500" />}
                          {type === 'document' && <FileText className="h-4 w-4 mr-2 text-green-500" />}
                          {type === 'quiz' && <BookOpen className="h-4 w-4 mr-2 text-purple-500" />}
                          <span className="capitalize">{type}s</span>
                        </div>
                        <span>{completed}/{total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;