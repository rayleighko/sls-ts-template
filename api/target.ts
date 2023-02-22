import { ApiAction1TargetRequestModel } from "@model/request-model/api-action1-target.model"
import { TargetModel } from "@model/target.model"
import { bodyParserWithValidation } from "@util/body-parser-util"
import { requestFail, requestSuccess } from "@util/http.util"
import { APIGatewayProxyHandler } from "aws-lambda"

export const action1: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) return requestFail({ message: "not found body" })

    const optionalParamList = []
    const requireParamList = []

    const paramList = [...requireParamList, ...optionalParamList]

    const body = await bodyParserWithValidation(
      ApiAction1TargetRequestModel,
      event.body,
      paramList,
    )

    // action1

    const responseBody = new TargetModel({ ulid: "action1", title: "action1" })

    console.info("done")

    return requestSuccess({
      statusCode: 200,
      message: "OK",
      body: responseBody,
      isBase64Encoded: true,
    })
  } catch (error) {
    console.log("target_action_post:APIGatewayProxyHandler -> error", error)

    return requestFail({ message: error })
  }
}
