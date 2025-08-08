import { 
  GrouperEffects, grouperReducer, 
  ProfileEffects, profileReducer,
  UserEffects, userReducer
} from '@features';

const appReducers = {
  groupers: grouperReducer,
  profiles: profileReducer,
  users: userReducer
};

export const appState = appReducers;
export const effectsProviders = [
  GrouperEffects,
  ProfileEffects,
  UserEffects
];
