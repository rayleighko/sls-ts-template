import { ApiRequestModel } from "@model/request-model/api-request.model"
import { JsonString } from "aws-sdk/clients/groundstation"
import isBase64 from "is-base64"
import { jsonrepair } from "jsonrepair"

import { createModelAndValidation } from "./http.util"

export const bodyParserWithValidation = async <
  R extends object = ApiRequestModel,
>(
  ApiRequest: { new (): R },
  _body: JsonString,
  paramList: string[],
): Promise<R> => {
  const body = isBase64(_body) ? Buffer.from(_body, "base64").toString() : _body

  const isJsonStr =
    body.charAt(0) === '"' && body.charAt(body.length - 1) === '"'
  const replacedBody = isJsonStr
    ? body.replace(/^./, "").replace(/.$/, "").replace(/'/g, '"')
    : body.replace(/'/g, '"')

  const data: R = JSON.parse(jsonrepair(replacedBody))

  // validate
  return createModelAndValidation<R>(new ApiRequest(), data, paramList)
}
