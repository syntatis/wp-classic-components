import { ReactNode, createContext, useContext } from 'react';
import {
	OverlayTriggerProps,
	OverlayTriggerState,
	useOverlayTriggerState,
} from 'react-stately';

interface DialogContextProps {
	state: OverlayTriggerState;
}

interface DialogProviderProps extends OverlayTriggerProps {
	children?: ReactNode;
}

const DialogContext = createContext<DialogContextProps>({
	state: {} as OverlayTriggerState,
});

export const DialogProvider = (props: DialogProviderProps) => {
	const { children } = props;
	const state = useOverlayTriggerState(props);

	return (
		<DialogContext.Provider value={{ state }}>
			{children}
		</DialogContext.Provider>
	);
};

export const useDialogContext = () => {
	return useContext(DialogContext);
};
