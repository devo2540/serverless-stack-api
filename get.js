import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition and sort ket of the item to be retreived
        Key: {
            userId: "123", // ID of the author
            noteId: event.pathParameters.id, //ID of the note from the path
        },
    };

    const result = await dynamoDb.get(params);

    if (!result.Item) {
        throw new Error("Item not found");
    }

    // Return the retreived item
    return result.Item;
});
