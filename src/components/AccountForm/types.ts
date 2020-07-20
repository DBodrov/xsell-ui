import { TAccountRequisites } from 'providers';

export interface IAccountFormProps {
    onUpdateAccount: (account: TAccountRequisites) => void;
    onArchivingAnketa: () => void;
}
