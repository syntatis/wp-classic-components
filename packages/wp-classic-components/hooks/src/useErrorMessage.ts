import { ReactNode } from 'react';

interface ErrorMessageArgs {
	errorMessage?:
		| ((args: {
				isInvalid: boolean;
				validationDetails: ValidityState;
				validationErrors: string[];
		  }) => ReactNode)
		| ReactNode;
	isInvalid: boolean;
	validationDetails: ValidityState;
	validationErrors: string[];
}

export function useErrorMessage(props: ErrorMessageArgs) {
	const errorMessageList = [];
	const { isInvalid, validationDetails, validationErrors } = props;
	const { errorMessage: errorMessageProps } = props;
	const errorMessageRendered =
		typeof errorMessageProps === 'function' ?
			errorMessageProps({
				isInvalid,
				validationDetails,
				validationErrors,
			})
		:	errorMessageProps;

	console.log(errorMessageRendered);

	if (errorMessageRendered) {
		errorMessageList.push(errorMessageRendered);
	}
	errorMessageList.push(...validationErrors);

	return {
		errorMessageList: errorMessageList || [],
	};
}
