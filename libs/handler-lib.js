// Create handler function that acts as wrapper around our Lambdas
// Takes a lambda function as an argument
export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        // Run the passed in Lambda
        try {
            // Run the Lambda
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            body = { error: e.message };
            statusCode = 500;
        }

        // Return HTTP response
        return {
            statusCode,
            body: JSON.stringify(body),
        };
    };
}
