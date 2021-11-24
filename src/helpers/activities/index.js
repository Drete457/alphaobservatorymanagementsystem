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
  weeksBetweenDates,
} from './old-newest-activities';
import exportToExcel from './exportToExcel';
import baseAmbit from './base-ambit';

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
  weeksBetweenDates,
  baseAmbit,
};

export default activitiesHandler;
