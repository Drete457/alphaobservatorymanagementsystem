import {
  activityInputHandler,
  activitySelectHandler,
  activityMultiSelectHandler,
  activityMultiInputHandler,
} from './activities-handler';
import fields from './fields';
import validateActivities from './validation';
import calendarToShow, {
  addDaysFormat,
  subtractDaysFormat,
} from './old-newest-activities';
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
  addDaysFormat,
  subtractDaysFormat,
};

export default activitiesHandler;
