export const successResponse = (res, statusCode, msg, actionPerformed, jsonDataToBeReturned) => {
   res.status(statusCode).json({
    action: actionPerformed,
    message: msg,
    successKey: true,
    responseData: jsonDataToBeReturned || "",
  });
}

export const errorResponse = (
  res,
  statusCode,
  msg,
  errorReason
) => {
  res.status(statusCode).json({
    error: errorReason,
    message: msg,
    successKey: false,
  });
};

//Status Codes and their respective meanings
//400 Bad Request
//401 Unauthorized
//403 Forbidden
//200 OK
// 201 Created