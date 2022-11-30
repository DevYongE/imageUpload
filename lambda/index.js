const sharp = require("sharp");
const aws = require("aws-sdk");
const s3 = new aws.S3();

const transformationoption=[
    {name:"w140", width:140},
    {name:"w600", width:600},
];

exports.handler = async (event) => {
    // TODO implement
    try {
        const Key = event.Record[0].s3.object.key;
        const keyOnly = Key.split("/")[1];
        const image = await s3
            .getObject({Bucket:"imageupload-tutorial2",Key})
            .promise();
        await Promise.all(
            transformationoption.map(async ({name,width})=>{
                try {
                    
                } catch (error) {
                    throw error
                }
            const newKey = `${name}/${keyOnly})`;
            const resizedImage = await sharp(image.body)
                .rotate()
                .resize(width)
                .toBuffer();
            await s3
                .putObject({
                    Bucket:"imageupload-tutorial2", 
                    Body:resizedImage, 
                    Key:newKey
                })
                .promise();
            })
        );
        return {
            statusCode: 200,
            body: event,
        };
    } catch (error) {
        return {
            
            statusCode: 500,
            body: event,
        }
    }
};
