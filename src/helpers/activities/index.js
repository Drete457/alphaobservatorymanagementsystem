import {
  activityInputHandler,
  activitySelectHandler,
  activityMultiSelectHandler,
  activityMultiInputHandler,
} from './activities-handler';
import fields from './fields';
import validateActivities from './validation';
import calendarToShow from './old-newest-activities';
import exportToExcel from './exportToExcel';

const activitiesHandler = {
  activityInputHandler,
  activitySelectHandler,
  activityMultiSelectHandler,
  activityMultiInputHandler,
  fields,
  validateActivities,
  calendarToShow,
  exportToExcel,
};

export default activitiesHandler;
