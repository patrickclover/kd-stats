import QS, { StringifiableRecord } from 'query-string'

function isErrorCode(statusCode: number): RegExpExecArray | null {
  return /4\d\d/.exec(String(statusCode)) || /5\d\d/.exec(String(statusCode))
}

export async function http<T>(
  info: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const request = new Request(info, init)
  //request.headers.set('Content-Type', 'application/json')

  const response = await fetch(request)
  if (isErrorCode(response.status)) {
    throw response
  }

  const body = await response.json()
  return body
}

export const post = <T>(url: string, body: object): Promise<T> =>
  http<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  })

export const put = <T>(url: string, body: object): Promise<T> =>
  http<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  })

export const get = <T>(
  url: string,
  params: StringifiableRecord = {}
): Promise<T> =>
  http<T>(
    QS.stringifyUrl(
      { url, query: params },
      { skipEmptyString: true, skipNull: true }
    )
  )
