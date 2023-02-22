import { ApiRequestModel } from "@model/request-model/api-request.model"
import { APIGatewayProxyResult } from "aws-lambda"
import { validateOrReject, ValidationError } from "class-validator"

export const responseCorsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": false,
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
}

export const requestSuccess = (
  body,
  statusCode = 200,
  headers = {},
): APIGatewayProxyResult => {
  if (typeof body === "object") body = JSON.stringify(body, null, 2)

  headers = { ...responseCorsHeader, ...headers }

  return { headers, statusCode, body }
}

export const requestFail = (
  body: string | object,
  statusCode = 500,
  headers = {},
): APIGatewayProxyResult => {
  if (typeof body === "object") body = JSON.stringify(body, null, 2)

  headers = { ...responseCorsHeader, ...headers }

  return { headers, statusCode, body }
}

export const createModelAndValidation = async <
  C extends object = ApiRequestModel,
>(
  classModel: C,
  body: C,
  paramList: string[],
) => {
  try {
    paramList.map((param) => (classModel[param] = body[param]))

    await validateOrReject(classModel)

    return classModel
  } catch (error) {
    if (error[0] instanceof ValidationError) {
      const errorMessageList = error.reduce((origin, ele) => {
        Object.keys(ele.constraints).map((key) => {
          origin.push(`${ele.constraints[key]}`)
        })
        return origin
      }, [])
      throw errorMessageList
    } else {
      throw error
    }
  }
}
