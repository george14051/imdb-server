import { StatusCodes } from 'http-status-codes';




export function json(str) {
    return JSON.stringify(str);
}

export function handle_success(res, data = { success: true }, status_code = StatusCodes.OK) {
    res.status(status_code);
    res.send(json(data));

}
