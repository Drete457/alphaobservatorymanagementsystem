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
import generateFields from './generate-fields';
import collaboratorsWithActivities from './collaborators-with-activities';

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
  generateFields,
  collaboratorsWithActivities,
};

export default activitiesHandler;
