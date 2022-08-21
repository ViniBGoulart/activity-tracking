<?php

namespace App\Services;

class ResponseService
{
    /**
     * Default Responses.
     *
     * @return array
     */
    public static function default($code, $request = null)
    {
        switch ($code) {
            case 409:
                return [
                    'status' => false,
                    'message' => "Already exists a post opened for this project. Close it before inserting a new one",
                    'request' => [$request->all()],
                ];
                break;
        }
    }
}
