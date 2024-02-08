<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BaseAPIController extends Controller
{
    public function sendResponse($result, $message, $status = 200): JsonResponse
    {
        $response = [
            'error' => false,
            'data'    => $result,
            'message' => $message,
        ];
        return response()->json($response, $status);
    }

    public function sendError($errorMessage = 'Something went wrong with request', $status = 400): JsonResponse
    {
        $response = [
            'error' => true,
            'message' => $errorMessage,
        ];
        return response()->json($response, $status);
    }
}
