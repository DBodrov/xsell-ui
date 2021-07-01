import GA from 'react-ga';
import {TestMode, StagingMode, JestEnv} from './Environment';

interface IAuditOptions {
  toGA?: boolean;
  toBE?: boolean;
}

type UserEventTypes = 'FE_PAGEVIEW' | 'FE_REDIRECT' | 'FE_DOWNLOAD';

interface IUserEvent {
  type: UserEventTypes;
  payload?: string | null;
}

const initAudit = () => {
  const trackId = TestMode || StagingMode ? 'UA-144581692-1' : 'UA-142682218-1';
  GA.initialize(trackId);
};

const saveUserEvent = (userEvent: IUserEvent) => {
  window.fetch('/gateway/report/store-event', {method: 'post', body: JSON.stringify(userEvent), headers: {'Content-Type': 'application/json'}})
};

let cachePath: string;

const pageView = (pathname: string, options: IAuditOptions = {}) => {
  if (JestEnv) return;
  if (pathname === cachePath) return;
  cachePath = pathname;
  const {toGA = true, toBE = true} = options;
  toGA && GA.pageview(pathname);
  toBE && saveUserEvent({type: 'FE_PAGEVIEW', payload: JSON.stringify({pathname})});
};

const userEvent = (eventArgs: GA.EventArgs, options: IAuditOptions = {}) => {
  const {toGA = true, toBE = false} = options;
  toGA && GA.event(eventArgs);
  if (toBE) {
    const {category, action} = eventArgs;
    const event: IUserEvent = {
      type: category as UserEventTypes,
      payload: JSON.stringify({target: action}),
    };
    saveUserEvent(event);
  }
};

export const auditService = {
  initAudit,
  pageView,
  userEvent,
};
