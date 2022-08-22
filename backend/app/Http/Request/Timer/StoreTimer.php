<?php

namespace App\Http\Request\Timer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTimer extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "name" => 'required|between:3,100',
            "description" => 'between:2,200',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param \Illuminate\Validation\Validator $validator
     * @return void
     */
    public function withValidator($validator)
    {
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json([
                'msg' => 'Some required field does not filled',
                'status' => false,
                'errors' => $validator->errors(),
                'url' => route('project.store')
            ], 403));
        }
    }
}
