// TODO: DEPRICATED. Use auditService instead;
import ReactGA from 'react-ga';
import * as Environment from './Environment';

type EventCategories = 'Redirect' | 'View';

const pageview = (path: string) => Environment.ProdMode && ReactGA.pageview(path);
const event = (category: EventCategories, action: string) =>
  Environment.ProdMode && ReactGA.event({ category, action });

export const ga = {
  pageview,
  event,
};
