import schedule from 'node-schedule';
import { Task } from '../models/Task';
import { logAction } from '../middleware/auditLog';

export const scheduleTasks = async () => {
  const tasks = await Task.find({ status: 'pending' });
  
  tasks.forEach(task => {
    schedule.scheduleJob(task.cronExpression, async () => {
      try {
        console.log(`Executing task: ${task.name}`);
        task.lastRun = new Date();
        task.status = 'completed';
        await task.save();
        
        await logAction({
          userId: 'system',
          actionType: 'task_executed',
          details: `Task ${task.name} completed`
        });
        
      } catch (error) {
        task.status = 'failed';
        await task.save();
        await logAction({
          userId: 'system',
          actionType: 'task_failed',
          details: `Task ${task.name} failed: ${error.message}`
        });
      }
    });
  });
}; 