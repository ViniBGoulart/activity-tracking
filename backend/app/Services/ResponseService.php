<?php

namespace App\Services;

class ResponseService
{
    /**
     * Default Responses.
     *
     * @return array|void
     */
    public static function default($config = array(), $id = null)
    {
        $route = $config['route'];
        switch ($config['type']) {
            case 'store':
                return [
                    'status' => true,
                    'msg' => 'Success when inserting data',
                    'url' => route($route)
                ];
                break;
            case 'show':
                return [
                    'status' => true,
                    'msg' => 'Successful Request',
                    'url' => $id != null ? route($route, $id) : route($route)
                ];
                break;
            case 'update':
                return [
                    'status' => true,
                    'msg' => 'Successful update',
                    'url' => $id != null ? route($route, $id) : route($route)
                ];
                break;
            case 'destroy':
                return [
                    'status' => true,
                    'msg' => 'Successful delete',
                    'url' => $id != null ? route($route, $id) : route($route)
                ];
                break;
            case 'stop':
                return [
                    'status' => true,
                    'msg' => 'Successful stopped',
                    'url' => $id != null ? route($route, $id) : route($route)
                ];
                break;
        }
    }

    /**
     * Register services.
     *
     * @return mixed|void
     */
    public static function exception($e)
    {
        switch ($e->getCode()) {
            case -403:
                return response()->json([
                    'status' => false,
                    'statusCode' => 403,
                    'error' => $e->getMessage()
                ], 403);
                break;
            case -404:
                return response()->json([
                    'status' => false,
                    'statusCode' => 404,
                    'error' => $e->getMessage()
                ], 404);
                break;
            default:
                if (app()->bound('sentry')) {
                    $sentry = app('sentry');
                    $user = auth()->user();
                    if ($user) {
                        $sentry->user_context(['id' => $user->id, 'name' => $user->name]);
                    }
                    $sentry->captureException($e);
                }
                return response()->json([
                    'status' => false,
                    'statusCode' => 500,
                    'error' => 'Error when performing operation',
                ], 500);
                break;
        }
    }
}
