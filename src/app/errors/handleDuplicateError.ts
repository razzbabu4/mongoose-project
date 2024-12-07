/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericsErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericsErrorResponse => {
    // Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [{
        path: "",
        message: `${extractedMessage} is already exists`
    }]
    const statusCode = 400;
    return {
        statusCode,
        message: "Opps!!! duplication occurred",
        errorSources
    }
}

export default handleDuplicateError;