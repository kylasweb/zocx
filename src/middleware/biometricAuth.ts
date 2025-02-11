export const analyzeBehavior = (userSession: UserSession) => {
  const typingPattern = calculateTypingSpeed(userSession.keystrokes);
  const mouseMovement = analyzeMousePattern(userSession.mouseEvents);
  
  if (deviationScore(typingPattern, mouseMovement) > 0.7) {
    triggerMultiFactorAuth();
  }
}; 