import {
  activityInputHandler,
  activitySelectHandler,
  activityMultiSelectHandler,
  activityMultiInputHandler,
} from './activities-handler';
import fields from './fields';
import validateActivities from './validation';

const activitiesHandler = {
  activityInputHandler,
  activitySelectHandler,
  activityMultiSelectHandler,
  activityMultiInputHandler,
  fields,
  validateActivities,
};

export default activitiesHandler;
