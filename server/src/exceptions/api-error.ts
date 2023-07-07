class ApiError extends Error {
  status
  code

  constructor(status: number, message: string, code?: number) {
    super(message)
    this.status = status
    this.code = code
  }

  static UnauthorizedError(message: string, code?: number) {
    return new ApiError(401, message, code)
  }

  static BadRequest(message: string, code?: number) {
    return new ApiError(400, message, code)
  }

  static NotFound(message: string, code?: number) {
    return new ApiError(404, message, code)
  }

  static InvalidToken() {
    return new ApiError(498, 'Invalid token')
  }
}

export default ApiError